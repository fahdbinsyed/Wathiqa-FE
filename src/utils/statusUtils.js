// Status Utility Functions
import { calculateDaysRemaining, isDateInPast } from './dateUtils';

export const getDocumentStatus = (expiryDate, reminderDays = 60) => {
  const daysRemaining = calculateDaysRemaining(expiryDate);
  
  if (isDateInPast(expiryDate)) {
    return 'Expired';
  }
  
  if (daysRemaining <= reminderDays) {
    return 'Expiring Soon';
  }
  
  return 'Valid';
};

export const getStatusColor = (status) => {
  switch (status) {
    case 'Valid':
      return '#22C55E'; // Green
    case 'Expiring Soon':
      return '#F59E0B'; // Orange
    case 'Expired':
      return '#EF4444'; // Red
    default:
      return '#6B7280'; // Gray
  }
};

export const getStatusTextColor = (status) => {
  switch (status) {
    case 'Valid':
      return '#065F46'; // Dark green
    case 'Expiring Soon':
      return '#92400E'; // Dark orange
    case 'Expired':
      return '#7F1D1D'; // Dark red
    default:
      return '#374151'; // Dark gray
  }
};

export const getStatusBackground = (status) => {
  switch (status) {
    case 'Valid':
      return '#DCFCE7'; // Light green
    case 'Expiring Soon':
      return '#FEF3C7'; // Light orange
    case 'Expired':
      return '#FEE2E2'; // Light red
    default:
      return '#F3F4F6'; // Light gray
  }
};

export const getStatusBorderColor = (status) => {
  switch (status) {
    case 'Valid':
      return '#86EFAC'; // Medium green
    case 'Expiring Soon':
      return '#FCD34D'; // Medium orange
    case 'Expired':
      return '#FCA5A5'; // Medium red
    default:
      return '#D1D5DB'; // Medium gray
  }
};

export const documentTypeToIcon = (documentType) => {
  const types = {
    'Iqama': '🆔',
    'Passport': '🛂',
    'Medical Insurance': '🏥',
    'Baladiya Card': '🏘️',
    'Driving License': '🚗',
    'Visa Copy': '✈️',
    'Contract Copy': '📄',
    'Other': '📋'
  };
  
  return types[documentType] || '📋';
};

export const getCompliancePercentage = (documents) => {
  if (documents.length === 0) return 100;
  
  const validCount = documents.filter(doc => doc.status === 'Valid').length;
  return Math.round((validCount / documents.length) * 100);
};

export const getExpiringCount = (documents) => {
  return documents.filter(doc => doc.status === 'Expiring Soon').length;
};

export const getExpiredCount = (documents) => {
  return documents.filter(doc => doc.status === 'Expired').length;
};

export const getValidCount = (documents) => {
  return documents.filter(doc => doc.status === 'Valid').length;
};
