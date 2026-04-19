// pages/CompanyDocuments.js
import React, { useMemo } from 'react';
import {
  Building, AlertCircle, CheckCircle
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import DashboardCard from '../components/DashboardCard';
import StatusBadge from '../components/StatusBadge';
import { useCompanyDocuments } from '../hooks/useCompanyDocuments';
import { useSettings } from '../hooks/useSettings';
import { formatDateToDisplay, calculateDaysRemaining } from '../utils/dateUtils';
import '../styles/Dashboard.css';

const CompanyDocuments = () => {
  const { documents } = useCompanyDocuments();
  const { language, selectedBranch } = useSettings();

  const translations = {
    en: {
      title: 'Company Documents',
      description: 'Manage company documents and compliance status',
      totalDocuments: 'Total Company Documents',
      expiringDocuments: 'Documents Expiring Soon',
      expiredDocuments: 'Expired Documents',
      recentExpiringDocuments: 'Recently Expiring Company Documents'
    },
    ar: {
      title: 'مستندات الشركة',
      description: 'إدارة مستندات الشركة وحالة الامتثال',
      totalDocuments: 'إجمالي مستندات الشركة',
      expiringDocuments: 'المستندات التي تنتهي قريباً',
      expiredDocuments: 'المستندات المنتهية الصلاحية',
      recentExpiringDocuments: 'مستندات الشركة التي تنتهي مؤخراً'
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
        icon={Building}
      />

      {/* Stats Cards */}
      <div className="stats-grid">
        <DashboardCard
          title={t.totalDocuments}
          value={stats.totalDocuments}
          icon={Building}
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
                  <th>Document Name</th>
                  <th>Document Type</th>
                  <th>Expiry Date</th>
                  <th>Days Remaining</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {expiringDocuments.map((doc) => (
                  <tr key={doc.documentId}>
                    <td className="emp-name">{doc.documentName}</td>
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
              <p className="empty-title">All company documents are valid!</p>
              <p className="empty-desc">No documents expiring soon</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyDocuments;