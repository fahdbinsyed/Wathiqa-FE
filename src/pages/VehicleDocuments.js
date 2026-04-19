// pages/VehicleDocuments.js
import React, { useMemo } from 'react';
import {
  Car, AlertCircle, CheckCircle
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import DashboardCard from '../components/DashboardCard';
import StatusBadge from '../components/StatusBadge';
import { useVehicleDocuments } from '../hooks/useVehicleDocuments';
import { useSettings } from '../hooks/useSettings';
import { formatDateToDisplay, calculateDaysRemaining } from '../utils/dateUtils';
import '../styles/Dashboard.css';

const VehicleDocuments = () => {
  const { documents } = useVehicleDocuments();
  const { language, selectedBranch } = useSettings();

  const translations = {
    en: {
      title: 'Vehicle Documents',
      description: 'Manage vehicle documents and compliance status',
      totalDocuments: 'Total Vehicle Documents',
      expiringDocuments: 'Documents Expiring Soon',
      expiredDocuments: 'Expired Documents',
      recentExpiringDocuments: 'Recently Expiring Vehicle Documents'
    },
    ar: {
      title: 'مستندات المركبات',
      description: 'إدارة مستندات المركبات وحالة الامتثال',
      totalDocuments: 'إجمالي مستندات المركبات',
      expiringDocuments: 'المستندات التي تنتهي قريباً',
      expiredDocuments: 'المستندات المنتهية الصلاحية',
      recentExpiringDocuments: 'مستندات المركبات التي تنتهي مؤخراً'
    }
  };

  const t = translations[language] || translations.en;

  // Filter data by selected branch
  const filteredDocuments = useMemo(() => {
    if (selectedBranch === 'All') return documents;
    return documents.filter(doc => doc.branchId === selectedBranch);
  }, [documents, selectedBranch]);

  // Calculate statistics
  const stats = useMemo(() => {
    const expiringCount = filteredDocuments.filter(d => d.status === 'Expiring Soon').length;
    const expiredCount = filteredDocuments.filter(d => d.status === 'Expired').length;

    return {
      totalDocuments: filteredDocuments.length,
      expiringDocuments: expiringCount,
      expiredDocuments: expiredCount
    };
  }, [filteredDocuments]);

  // Get expiring soon documents
  const expiringDocuments = useMemo(() => {
    return filteredDocuments
      .filter(d => d.status === 'Expiring Soon')
      .sort((a, b) => calculateDaysRemaining(a.expiryDate) - calculateDaysRemaining(b.expiryDate))
      .slice(0, 10);
  }, [filteredDocuments]);

  return (
    <div className="dashboard-page">
      <PageHeader
        title={t.title}
        description={t.description}
        icon={Car}
      />

      {/* Stats Cards */}
      <div className="stats-grid">
        <DashboardCard
          title={t.totalDocuments}
          value={stats.totalDocuments}
          icon={Car}
          color="primary"
        />
        <DashboardCard
          title={t.expiringDocuments}
          value={stats.expiringDocuments}
          icon={AlertCircle}
          color="warning"
        />
        <DashboardCard
          title={t.expiredDocuments}
          value={stats.expiredDocuments}
          icon={AlertCircle}
          color="danger"
        />
      </div>

      {/* Expiring Documents Table */}
      <div className="expiring-section">
        <h2>{t.recentExpiringDocuments}</h2>
        <div className="expiring-table-wrapper">
          {expiringDocuments.length > 0 ? (
            <table className="expiring-table">
              <thead>
                <tr>
                  <th>Vehicle ID</th>
                  <th>Document Type</th>
                  <th>Expiry Date</th>
                  <th>Days Remaining</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {expiringDocuments.map((doc) => (
                  <tr key={doc.documentId}>
                    <td className="emp-name">{doc.vehicleId}</td>
                    <td>{doc.documentType}</td>
                    <td>{formatDateToDisplay(doc.expiryDate)}</td>
                    <td>
                      <span className="days-badge">
                        {calculateDaysRemaining(doc.expiryDate)} days
                      </span>
                    </td>
                    <td>
                      <StatusBadge status={doc.status} size="small" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty-state">
              <CheckCircle size={48} />
              <p className="empty-title">All vehicle documents are valid!</p>
              <p className="empty-desc">No documents expiring soon</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleDocuments;