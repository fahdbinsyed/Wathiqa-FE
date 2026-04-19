// pages/EmployeeDocuments.js
import React, { useMemo } from 'react';
import {
  Users, AlertCircle, CheckCircle
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import DashboardCard from '../components/DashboardCard';
import StatusBadge from '../components/StatusBadge';
import { useEmployees } from '../hooks/useEmployees';
import { useDocuments } from '../hooks/useDocuments';
import { useSettings } from '../hooks/useSettings';
import { formatDateToDisplay, calculateDaysRemaining } from '../utils/dateUtils';
import '../styles/Dashboard.css';

const EmployeeDocuments = () => {
  const { employees } = useEmployees();
  const { documents } = useDocuments();
  const { language, selectedBranch } = useSettings();

  const translations = {
    en: {
      title: 'Employee Documents',
      description: 'Manage employee documents and compliance status',
      totalEmployees: 'Total Employees',
      expiringDocuments: 'Documents Expiring Soon',
      expiredDocuments: 'Expired Documents',
      recentExpiringDocuments: 'Recently Expiring Employee Documents'
    },
    ar: {
      title: 'مستندات الموظفين',
      description: 'إدارة مستندات الموظفين وحالة الامتثال',
      totalEmployees: 'إجمالي الموظفين',
      expiringDocuments: 'المستندات التي تنتهي قريباً',
      expiredDocuments: 'المستندات المنتهية الصلاحية',
      recentExpiringDocuments: 'مستندات الموظفين التي تنتهي مؤخراً'
    }
  };

  const t = translations[language] || translations.en;

  // Filter data by selected branch
  const filteredEmployees = useMemo(() => {
    if (selectedBranch === 'All') return employees;
    return employees.filter(emp => emp.branchId === selectedBranch);
  }, [employees, selectedBranch]);

  const filteredDocuments = useMemo(() => {
    if (selectedBranch === 'All') return documents;
    return documents.filter(doc => doc.branchId === selectedBranch);
  }, [documents, selectedBranch]);

  // Calculate statistics
  const stats = useMemo(() => {
    const expiringCount = filteredDocuments.filter(d => d.status === 'Expiring Soon').length;
    const expiredCount = filteredDocuments.filter(d => d.status === 'Expired').length;

    return {
      totalEmployees: filteredEmployees.length,
      expiringDocuments: expiringCount,
      expiredDocuments: expiredCount
    };
  }, [filteredDocuments, filteredEmployees]);

  // Get expiring soon documents (employee only)
  const getEmployeeName = (employeeId) => {
    const emp = employees.find(e => e.employeeId === employeeId);
    return emp ? emp.fullName : 'Unknown';
  };

  const expiringDocuments = useMemo(() => {
    return filteredDocuments
      .filter(d => d.status === 'Expiring Soon')
      .map(d => ({ ...d, entityName: getEmployeeName(d.employeeId) }))
      .sort((a, b) => calculateDaysRemaining(a.expiryDate) - calculateDaysRemaining(b.expiryDate))
      .slice(0, 10);
  }, [filteredDocuments, employees]);

  return (
    <div className="dashboard-page">
      <PageHeader
        title={t.title}
        description={t.description}
        icon={Users}
      />

      {/* Stats Cards */}
      <div className="stats-grid">
        <DashboardCard
          title={t.totalEmployees}
          value={stats.totalEmployees}
          icon={Users}
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
                  <th>Employee</th>
                  <th>Document Type</th>
                  <th>Expiry Date</th>
                  <th>Days Remaining</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {expiringDocuments.map((doc) => (
                  <tr key={doc.documentId}>
                    <td className="emp-name">{doc.entityName}</td>
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
              <p className="empty-title">All employee documents are valid!</p>
              <p className="empty-desc">No documents expiring soon</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDocuments;