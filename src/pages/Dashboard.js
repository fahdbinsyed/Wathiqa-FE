// pages/Dashboard.js
import React, { useMemo } from 'react';
import {
  Users, FileText, AlertCircle, CheckCircle,
  TrendingUp, Activity
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PageHeader from '../components/PageHeader';
import DashboardCard from '../components/DashboardCard';
import DocumentTable from '../components/DocumentTable';
import StatusBadge from '../components/StatusBadge';
import { useEmployees } from '../hooks/useEmployees';
import { useDocuments } from '../hooks/useDocuments';
import { useSettings } from '../hooks/useSettings';
import { formatDateToDisplay, calculateDaysRemaining } from '../utils/dateUtils';
import { getStatusColor } from '../utils/statusUtils';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { employees } = useEmployees();
  const { documents } = useDocuments();
  const { language } = useSettings();

  const translations = {
    en: {
      title: 'Dashboard',
      description: 'Overview of your employee documents and compliance status',
      totalEmployees: 'Total Employees',
      totalDocuments: 'Total Documents',
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
      totalDocuments: 'إجمالي المستندات',
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

  // Calculate statistics
  const stats = useMemo(() => {
    const validCount = documents.filter(d => d.status === 'Valid').length;
    const expiringCount = documents.filter(d => d.status === 'Expiring Soon').length;
    const expiredCount = documents.filter(d => d.status === 'Expired').length;
    const totalCount = documents.length;

    return {
      totalEmployees: employees.length,
      totalDocuments: totalCount,
      expiringDocuments: expiringCount,
      expiredDocuments: expiredCount,
      validCount,
      expiringCount,
      expiredCount
    };
  }, [documents, employees]);

  // Prepare chart data
  const statusChartData = useMemo(() => [
    { name: t.valid, value: stats.validCount, color: '#22C55E' },
    { name: t.expiringS, value: stats.expiringCount, color: '#F59E0B' },
    { name: t.expired, value: stats.expiredCount, color: '#EF4444' }
  ].filter(item => item.value > 0), [stats, t]);

  const departmentChartData = useMemo(() => {
    const deptMap = {};
    employees.forEach(emp => {
      if (!deptMap[emp.department]) {
        deptMap[emp.department] = { total: 0, valid: 0 };
      }
      deptMap[emp.department].total++;
    });

    documents.forEach(doc => {
      const emp = employees.find(e => e.employeeId === doc.employeeId);
      if (emp && doc.status === 'Valid') {
        deptMap[emp.department].valid++;
      }
    });

    return Object.keys(deptMap).map(dept => ({
      name: dept,
      compliance: deptMap[dept].total > 0 ? Math.round((deptMap[dept].valid / deptMap[dept].total) * 100) : 0
    }));
  }, [employees, documents]);

  // Get expiring soon documents
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
        {/* <DashboardCard
          title={t.totalDocuments}
          value={stats.totalDocuments}
          icon={FileText}
          color="primary"
        /> */}
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

      {/* 
      <div className="charts-grid">
        {/* Status Distribution * /}
        <div className="chart-card">
          <h3>{t.documentStatus}</h3>
          <div className="chart-container">
            {statusChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="no-data">No data available</p>
            )}
          </div>
        </div>

        {/* Department Compliance * /}
        <div className="chart-card">
          <h3>{t.departmentCompliance}</h3>
          <div className="chart-container">
            {departmentChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="compliance" fill={getStatusColor('Valid')} radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="no-data">No data available</p>
            )}
          </div>
        </div>
      </div>
      */}

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
                    <td>{doc.documentType ?? "Null"}</td>
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
