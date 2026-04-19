// hooks/useVehicleDocuments.js
import { useContext } from 'react';
import { VehicleDocumentContext } from '../context/VehicleDocumentContext';

export const useVehicleDocuments = () => {
  const context = useContext(VehicleDocumentContext);
  if (!context) {
    throw new Error('useVehicleDocuments must be used within a VehicleDocumentProvider');
  }
  return context;
};