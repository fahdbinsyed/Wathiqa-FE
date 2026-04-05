// components/StatusBadge.js
import React from 'react';
import { getStatusColor, getStatusTextColor, getStatusBackground } from '../utils/statusUtils';

const StatusBadge = ({ status, size = 'medium' }) => {
  const sizeStyles = {
    small: { padding: '0.25rem 0.75rem', fontSize: '0.75rem' },
    medium: { padding: '0.5rem 1rem', fontSize: '0.875rem' },
    large: { padding: '0.75rem 1.25rem', fontSize: '1rem' }
  };

  const style = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '9999px',
    fontWeight: '600',
    ...sizeStyles[size],
    backgroundColor: getStatusBackground(status),
    color: getStatusTextColor(status),
    border: `1.5px solid ${getStatusColor(status)}`,
    whiteSpace: 'nowrap'
  };

  return <span style={style}>{status}</span>;
};

export default StatusBadge;
