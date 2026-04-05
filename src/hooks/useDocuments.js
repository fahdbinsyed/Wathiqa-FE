// hooks/useDocuments.js
import { useContext } from 'react';
import { DocumentContext } from '../context/DocumentContext';

export const useDocuments = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocuments must be used within DocumentProvider');
  }
  return context;
};
