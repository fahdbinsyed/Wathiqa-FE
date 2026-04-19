// CompanyDocumentContext.js
import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { mockCompanyDocuments } from '../data/mockCompanyDocuments';
import { getDocumentStatus } from '../utils/statusUtils';

export const CompanyDocumentContext = createContext();

export const CompanyDocumentProvider = ({ children, reminderDays = 60 }) => {
  const [rawDocuments, setRawDocuments] = useState(() => {
    const saved = localStorage.getItem('companyDocuments');
    return saved ? JSON.parse(saved) : mockCompanyDocuments;
  });

  // Memoize documents with calculated status based on reminderDays
  const documents = useMemo(() => {
    return rawDocuments.map(doc => ({
      ...doc,
      status: doc.hasExpiry ? getDocumentStatus(doc.expiryDate, reminderDays) : 'Valid'
    }));
  }, [rawDocuments, reminderDays]);

  useEffect(() => {
    localStorage.setItem('companyDocuments', JSON.stringify(rawDocuments));
  }, [rawDocuments]);

  const addDocument = useCallback((document) => {
    const newDocument = {
      ...document,
      documentId: `COMP${String(Math.max(...rawDocuments.map(d => parseInt(d.documentId.replace('COMP', '')) || 0)) + 1).padStart(3, '0')}`
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

  const searchDocuments = useCallback((query) => {
    if (!query.trim()) return documents;

    const lowerQuery = query.toLowerCase();
    return documents.filter(doc =>
      doc.documentId.toLowerCase().includes(lowerQuery) ||
      doc.documentName.toLowerCase().includes(lowerQuery) ||
      doc.documentNumber.toLowerCase().includes(lowerQuery)
    );
  }, [documents]);

  const filterByType = useCallback((type) => {
    if (!type) return documents;
    return documents.filter(doc => doc.documentName === type);
  }, [documents]);

  const filterByStatus = useCallback((status) => {
    if (!status) return documents;
    return documents.filter(doc => doc.status === status);
  }, [documents]);

  const filterByBranch = useCallback((branchId) => {
    if (!branchId || branchId === 'All') return documents;
    return documents.filter(doc => doc.branchId === branchId);
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
    const types = new Set(documents.map(doc => doc.documentName));
    return Array.from(types);
  }, [documents]);

  const value = {
    documents,
    addDocument,
    updateDocument,
    deleteDocument,
    getDocumentById,
    searchDocuments,
    filterByType,
    filterByStatus,
    filterByBranch,
    getExpiringDocuments,
    getExpiredDocuments,
    getValidDocuments,
    getDocumentTypes
  };

  return (
    <CompanyDocumentContext.Provider value={value}>
      {children}
    </CompanyDocumentContext.Provider>
  );
};