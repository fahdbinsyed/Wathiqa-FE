// VehicleDocumentContext.js
import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { mockVehicleDocuments } from '../data/mockVehicleDocuments';
import { getDocumentStatus } from '../utils/statusUtils';

export const VehicleDocumentContext = createContext();

export const VehicleDocumentProvider = ({ children, reminderDays = 60 }) => {
  const [rawDocuments, setRawDocuments] = useState(() => {
    const saved = localStorage.getItem('vehicleDocuments');
    return saved ? JSON.parse(saved) : mockVehicleDocuments;
  });

  // Memoize documents with calculated status based on reminderDays
  const documents = useMemo(() => {
    return rawDocuments.map(doc => ({
      ...doc,
      status: getDocumentStatus(doc.expiryDate, reminderDays)
    }));
  }, [rawDocuments, reminderDays]);

  useEffect(() => {
    localStorage.setItem('vehicleDocuments', JSON.stringify(rawDocuments));
  }, [rawDocuments]);

  const addDocument = useCallback((document) => {
    const newDocument = {
      ...document,
      documentId: `VDC${String(Math.max(...rawDocuments.map(d => parseInt(d.documentId.replace('VDC', '')) || 0)) + 1).padStart(3, '0')}`
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

  const getDocumentsByVehicleId = useCallback((vehicleId) => {
    return documents.filter(doc => doc.vehicleId === vehicleId);
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
    const types = new Set(documents.map(doc => doc.documentType));
    return Array.from(types);
  }, [documents]);

  const value = {
    documents,
    addDocument,
    updateDocument,
    deleteDocument,
    getDocumentById,
    getDocumentsByVehicleId,
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
    <VehicleDocumentContext.Provider value={value}>
      {children}
    </VehicleDocumentContext.Provider>
  );
};