// hooks/useActivityLogs.js
import { useContext } from 'react';
import { ActivityLogContext } from '../context/ActivityLogContext';

export const useActivityLogs = () => {
  const context = useContext(ActivityLogContext);
  if (!context) {
    throw new Error('useActivityLogs must be used within an ActivityLogProvider');
  }
  return context;
};