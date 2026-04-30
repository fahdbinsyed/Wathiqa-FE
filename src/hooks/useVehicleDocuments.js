// hooks/useVehicleDocuments.js
import { useContext } from 'react';
import { VehicleDocumentContext } from '../context/VehicleDocumentContext';

export const useVehicleDocuments = () => useContext(VehicleDocumentContext);