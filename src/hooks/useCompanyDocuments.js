// hooks/useCompanyDocuments.js
import { useContext } from 'react';
import { CompanyDocumentContext } from '../context/CompanyDocumentContext';

export const useCompanyDocuments = () => useContext(CompanyDocumentContext);