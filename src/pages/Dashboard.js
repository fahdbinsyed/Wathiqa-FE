// pages/Dashboard.js
import React, { useMemo } from 'react';
import {
  Users, FileText, AlertCircle, CheckCircle,
  TrendingUp, Activity, Building2, UserCheck, Car
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import DashboardCard from '../components/DashboardCard';
import StatusBadge from '../components/StatusBadge';
import { useEmployees } from '../hooks/useEmployees';
import { useDocuments } from '../hooks/useDocuments';
import { useSettings } from '../hooks/useSettings';
import { mockCompanyDocuments } from '../data/mockCompanyDocuments';
import { mockVehicleDocuments } from '../data/mockVehicleDocuments';
import { formatDateToDisplay, calculateDaysRemaining } from '../utils/dateUtils';
import { getStatusColor } from '../utils/statusUtils';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { employees } = useEmployees();
  const { documents } = useDocuments(); // employee documents only
  const { language, selectedBranch } = useSettings();

  const translations = {
    en: {
      title: 'Dashboard',
      description: 'Overview of your employee documents and compliance status',
      totalEmployees: 'Total Employees',
      totalCompanyDocuments: 'Company Documents',
      totalEmployeeDocuments: 'Employee Documents',
      totalVehicleDocuments: 'Vehicle Documents',
      expiringDocuments: 'Expiring Soon',
      expiredDocuments: 'Expired Documents',
      documentStatus: 'Document Status Distribution',
      departmentCompliance: 'Department Compliance',
      recentExpiringDocuments: 'Recently Expiring Documents',
      valid: 'Valid',
      expiringS: 'Expiring Soon',
      expired: 'Expired'
    },
    ar: {
      title: 'لوحة التحكم',
      description: 'نظرة عامة على مستندات الموظفين وحالة الامتثال',
      totalEmployees: 'إجمالي الموظفين',
      totalCompanyDocuments: 'وثائق الشركة',
      totalEmployeeDocuments: 'وثائق الموظفين',
      totalVehicleDocuments: 'وثائق المركبات',
      expiringDocuments: 'ينتهي قريباً',
      expiredDocuments: 'منتهية الصلاحية',
      documentStatus: 'توزيع حالة المستندات',
      departmentCompliance: 'امتثال القسم',
      recentExpiringDocuments: 'المستندات التي تنتهي مؤخراً',
      valid: 'صحيح',
      expiringS: 'ينتهي قريباً',
      expired: 'منتهية الصلاحية'
    }
  };

  const t = translations[language] || translations.en;

  const stats = useMemo(() => {
    // Filter employees by branch
    const filteredEmployees = selectedBranch && selectedBranch !== 'All'
      ? employees.filter(emp => emp.branch === selectedBranch)
      : employees;

    // Employee documents - filtered by branch via employeeId
    const employeeIds = filteredEmployees.map(emp => emp.employeeId);
    const filteredEmployeeDocs = documents.filter(doc =>
      employeeIds.includes(doc.employeeId)
    );

    // Company documents - filtered by branch
    const filteredCompanyDocs = selectedBranch && selectedBranch !== 'All'
      ? mockCompanyDocuments.filter(d => d.branchName === selectedBranch || d.branchId === selectedBranch)
      : mockCompanyDocuments;

    // Vehicle documents - filtered by branch
    const filteredVehicleDocs = selectedBranch && selectedBranch !== 'All'
      ? mockVehicleDocuments.filter(d => d.branchName === selectedBranch || d.branchId === selectedBranch)
      : mockVehicleDocuments;

    // Employee doc status counts
    const validCount = filteredEmployeeDocs.filter(d => d.status === 'Valid').length;
    const expiringCount = filteredEmployeeDocs.filter(d => d.status === 'Expiring Soon').length;
    const expiredCount = filteredEmployeeDocs.filter(d => d.status === 'Expired').length;

    return {
      totalEmployees: filteredEmployees.length,
      totalCompanyDocuments: filteredCompanyDocs.length,
      totalEmployeeDocuments: filteredEmployeeDocs.length,
      totalVehicleDocuments: filteredVehicleDocs.length,
      expiringDocuments: expiringCount,
      expiredDocuments: expiredCount,
      validCount,
      expiringCount,
      expiredCount
    };
  }, [documents, employees, selectedBranch]);

  const statusChartData = useMemo(() => [
    { name: t.valid, value: stats.validCount, color: '#22C55E' },
    { name: t.expiringS, value: stats.expiringCount, color: '#F59E0B' },
    { name: t.expired, value: stats.expiredCount, color: '#EF4444' }
  ].filter(item => item.value > 0), [stats, t]);

  const expiringDocuments = useMemo(() => {
    return documents
      .filter(d => d.status === 'Expiring Soon')
      .sort((a, b) => calculateDaysRemaining(a.expiryDate) - calculateDaysRemaining(b.expiryDate))
      .slice(0, 5);
  }, [documents]);

  const getEmployeeName = (employeeId) => {
    const emp = employees.find(e => e.employeeId === employeeId);
    return emp ? emp.fullName : 'Unknown';
  };

  const getDocumentStatus = (expiryDate) => {
    const today = new Date();
    const expDate = new Date(expiryDate);
    const diffDays = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return 'Expired';
    if (diffDays <= 30) return 'Expiring Soon';
    return 'Valid';
  };

  return (
    <div className="dashboard-page">
      <PageHeader
        title={t.title}
        description={t.description}
        icon={Activity}
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
          title={t.totalCompanyDocuments}
          value={stats.totalCompanyDocuments}
          icon={Building2}
          color="primary"
        />
        <DashboardCard
          title={t.totalEmployeeDocuments}
          value={stats.totalEmployeeDocuments}
          icon={UserCheck}
          color="primary"
        />
        <DashboardCard
          title={t.totalVehicleDocuments}
          value={stats.totalVehicleDocuments}
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
                    <td className="emp-name">{getEmployeeName(doc.employeeId)}</td>
                    <td>{doc.documentType ?? 'Null'}</td>
                    <td>{formatDateToDisplay(doc.expiryDate)}</td>
                    <td>
                      <span className="days-badge">
                        {calculateDaysRemaining(doc.expiryDate)} days
                      </span>
                    </td>
                    <td>
                      <StatusBadge status={getDocumentStatus(doc.expiryDate)} size="small" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty-state">
              <CheckCircle size={48} />
              <p className="empty-title">All documents are valid!</p>
              <p className="empty-desc">No documents expiring soon</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;