// Date Utility Functions
import { differenceInDays, format, isAfter, isBefore, parseISO, addDays, subDays } from 'date-fns';

export const calculateDaysRemaining = (expiryDate) => {
  const expiry = typeof expiryDate === 'string' ? parseISO(expiryDate) : expiryDate;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return differenceInDays(expiry, today);
};

export const formatDate = (date, dateFormat = 'dd/MM/yyyy') => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, dateFormat);
  } catch {
    return '';
  }
};

export const formatDateToDisplay = (date) => {
  return formatDate(date, 'MMM dd, yyyy');
};

export const getDateFromString = (dateString) => {
  return parseISO(dateString);
};

export const isDateInPast = (date) => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  dateObj.setHours(0, 0, 0, 0);
  
  return isBefore(dateObj, today) || dateObj.getTime() === today.getTime();
};

export const isDateInFuture = (date) => {
  return !isDateInPast(date);
};

export const daysUntilExpiry = (expiryDate) => {
  return calculateDaysRemaining(expiryDate);
};
