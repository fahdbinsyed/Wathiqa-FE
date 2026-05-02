// DocumentContext.js
import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { mockDocuments } from '../data/mockDocuments';
import { getDocumentStatus } from '../utils/statusUtils';

export const DocumentContext = createContext();

export const DocumentProvider = ({ children, reminderDays = 60 }) => {
  const [rawDocuments, setRawDocuments] = useState(() => {
    const saved = localStorage.getItem('documents');
    const parsed = saved ? JSON.parse(saved) : null;
    
    // Fallback to mock documents if the saved data uses the old employeeId format
    if (parsed && parsed.length > 0 && parsed[0].iqamaId) {
      return parsed;
    }
    return mockDocuments;
  });

  // Memoize documents with calculated status based on reminderDays
  const documents = useMemo(() => {
    return rawDocuments.map(doc => ({
      ...doc,
      status: getDocumentStatus(doc.expiryDate, reminderDays)
    }));
  }, [rawDocuments, reminderDays]);

  useEffect(() => {
    localStorage.setItem('documents', JSON.stringify(rawDocuments));
  }, [rawDocuments]);

  const addDocument = useCallback((document) => {
    const newDocument = {
      ...document,
      documentId: `DOC${String(Math.max(...rawDocuments.map(d => parseInt(d.documentId.replace('DOC', '')) || 0)) + 1).padStart(3, '0')}`
    };
    setRawDocuments([...rawDocuments, newDocument]);
    return newDocument;
  }, [rawDocuments]);

  const updateDocument = useCallback((documentId, updatedDocument) => {
    setRawDocuments(rawDocuments.map(doc =>
      doc.documentId === documentId ? { ...doc, ...updatedDocument } : doc
    ));
  }, [rawDocuments]);

  const deleteDocument = useCallback((documentId) => {
    setRawDocuments(rawDocuments.filter(doc => doc.documentId !== documentId));
  }, [rawDocuments]);

  const getDocumentById = useCallback((documentId) => {
    return documents.find(doc => doc.documentId === documentId);
  }, [documents]);

  const getDocumentsByIqamaId = useCallback((iqamaId) => {
    return documents.filter(doc => doc.iqamaId === iqamaId);
  }, [documents]);

  const searchDocuments = useCallback((query) => {
    if (!query.trim()) return documents;
    
    const lowerQuery = query.toLowerCase();
    return documents.filter(doc =>
      doc.documentId.toLowerCase().includes(lowerQuery) ||
      doc.documentType.toLowerCase().includes(lowerQuery) ||
      doc.documentNumber.toLowerCase().includes(lowerQuery)
    );
  }, [documents]);

  const filterByType = useCallback((type) => {
    if (!type) return documents;
    return documents.filter(doc => doc.documentType === type);
  }, [documents]);

  const filterByStatus = useCallback((status) => {
    if (!status) return documents;
    return documents.filter(doc => doc.status === status);
  }, [documents]);

  const filterByIqamaId = useCallback((iqamaId) => {
    if (!iqamaId) return documents;
    return documents.filter(doc => doc.iqamaId === iqamaId);
  }, [documents]);

  const getExpiringDocuments = useCallback(() => {
    return documents.filter(doc => doc.status === 'Expiring Soon');
  }, [documents]);

  const getExpiredDocuments = useCallback(() => {
    return documents.filter(doc => doc.status === 'Expired');
  }, [documents]);

  const getValidDocuments = useCallback(() => {
    return documents.filter(doc => doc.status === 'Valid');
  }, [documents]);

  const getDocumentTypes = useCallback(() => {
    const types = new Set(documents.map(doc => doc.documentType));
    return Array.from(types);
  }, [documents]);

  // Filter documents by branch - joins with employees to get branch info
  const filterByBranch = useCallback((branch, employees) => {
    if (!branch || branch === 'All') return documents;
    if (!employees || employees.length === 0) return documents;
    
    // Get employee IDs that belong to the selected branch
    const iqamaIdsInBranch = employees
      .filter(emp => emp.branch === branch)
      .map(emp => emp.iqamaId);
    
    return documents.filter(doc => iqamaIdsInBranch.includes(doc.iqamaId));
  }, [documents]);

  const value = {
    documents,
    addDocument,
    updateDocument,
    deleteDocument,
    getDocumentById,
    getDocumentsByIqamaId,
    searchDocuments,
    filterByType,
    filterByStatus,
    filterByIqamaId,
    filterByBranch,
    getExpiringDocuments,
    getExpiredDocuments,
    getValidDocuments,
    getDocumentTypes
  };

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
};
