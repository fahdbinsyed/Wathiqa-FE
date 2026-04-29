// hooks/useCompanyDocuments.js
import { useContext } from 'react';
import { CompanyDocumentContext } from '../context/CompanyDocumentContext';

export const useCompanyDocuments = () => {
  const context = useContext(CompanyDocumentContext);
  if (!context) {
    throw new Error('useCompanyDocuments must be used within a CompanyDocumentProvider');
  }
  return context;
};