// pages/Dashboard.js
import React, { useMemo } from 'react';
import {
  Users, AlertCircle, CheckCircle,
  Activity, Building2, UserCheck, Car
} from 'lucide-react';

import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, CartesianGrid, XAxis, YAxis
} from 'recharts';

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
  const { documents } = useDocuments();
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

  // =========================
  // STATS
  // =========================
  const stats = useMemo(() => {
    const filteredEmployees = selectedBranch && selectedBranch !== 'All'
      ? employees.filter(emp => emp.branch === selectedBranch)
      : employees;

    const employeeIds = filteredEmployees.map(emp => emp.employeeId);

    const filteredEmployeeDocs = documents.filter(doc =>
      employeeIds.includes(doc.employeeId)
    );

    const filteredCompanyDocs = selectedBranch && selectedBranch !== 'All'
      ? mockCompanyDocuments.filter(d => d.branchName === selectedBranch || d.branchId === selectedBranch)
      : mockCompanyDocuments;

    const filteredVehicleDocs = selectedBranch && selectedBranch !== 'All'
      ? mockVehicleDocuments.filter(d => d.branchName === selectedBranch || d.branchId === selectedBranch)
      : mockVehicleDocuments;

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
  }, [employees, documents, selectedBranch]);

  // =========================
  // PIE CHART DATA
  // =========================
  const statusChartData = useMemo(() => {
    return [
      { name: t.valid, value: stats.validCount, color: '#22C55E' },
      { name: t.expiringS, value: stats.expiringCount, color: '#F59E0B' },
      { name: t.expired, value: stats.expiredCount, color: '#EF4444' }
    ].filter(item => item.value > 0);
  }, [stats, t]);

  // =========================
  // BAR CHART DATA
  // =========================
  const departmentChartData = useMemo(() => {
    const filteredEmployees = selectedBranch && selectedBranch !== 'All'
      ? employees.filter(emp => emp.branch === selectedBranch)
      : employees;

    const employeeIds = filteredEmployees.map(emp => emp.employeeId);

    const filteredDocs = documents.filter(doc =>
      employeeIds.includes(doc.employeeId)
    );

    const departmentMap = {};

    filteredEmployees.forEach(emp => {
      const dept = emp.department || 'Unknown';

      const empDocs = filteredDocs.filter(d => d.employeeId === emp.employeeId);

      const validDocs = empDocs.filter(d => d.status === 'Valid').length;
      const totalDocs = empDocs.length;

      const compliance = totalDocs > 0
        ? Math.round((validDocs / totalDocs) * 100)
        : 0;

      if (!departmentMap[dept]) {
        departmentMap[dept] = { total: 0, count: 0 };
      }

      departmentMap[dept].total += compliance;
      departmentMap[dept].count += 1;
    });

    return Object.keys(departmentMap).map(dept => ({
      name: dept,
      compliance: Math.round(
        departmentMap[dept].total / departmentMap[dept].count
      )
    }));
  }, [employees, documents, selectedBranch]);

  // =========================
  // EXPIRING DOCUMENTS
  // =========================
  const expiringDocuments = useMemo(() => {
    return documents
      .filter(d => d.status === 'Expiring Soon')
      .sort((a, b) =>
        calculateDaysRemaining(a.expiryDate) - calculateDaysRemaining(b.expiryDate)
      )
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

  const getStatusFromDate = (expiryDate) => {
  const today = new Date();
  const expDate = new Date(expiryDate);
  const diffDays = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'Expired';
  if (diffDays <= 30) return 'Expiring Soon';
  return 'Valid';
  };
  
  const companyStatusChartData = useMemo(() => {
  const filteredCompanyDocs = selectedBranch && selectedBranch !== 'All'
    ? mockCompanyDocuments.filter(d => d.branchName === selectedBranch || d.branchId === selectedBranch)
    : mockCompanyDocuments;

  let valid = 0, expiring = 0, expired = 0;

  filteredCompanyDocs.forEach(doc => {
    const status = getStatusFromDate(doc.expiryDate);

    if (status === 'Valid') valid++;
    else if (status === 'Expiring Soon') expiring++;
    else expired++;
  });

  return [
    { name: t.valid, value: valid, color: '#22C55E' },
    { name: t.expiringS, value: expiring, color: '#F59E0B' },
    { name: t.expired, value: expired, color: '#EF4444' }
  ].filter(item => item.value > 0);

  }, [selectedBranch, t]);
  
  const vehicleStatusChartData = useMemo(() => {
  const filteredVehicleDocs = selectedBranch && selectedBranch !== 'All'
    ? mockVehicleDocuments.filter(d => d.branchName === selectedBranch || d.branchId === selectedBranch)
    : mockVehicleDocuments;

  let valid = 0, expiring = 0, expired = 0;

  filteredVehicleDocs.forEach(doc => {
    const status = getStatusFromDate(doc.expiryDate);

    if (status === 'Valid') valid++;
    else if (status === 'Expiring Soon') expiring++;
    else expired++;
  });

  return [
    { name: t.valid, value: valid, color: '#22C55E' },
    { name: t.expiringS, value: expiring, color: '#F59E0B' },
    { name: t.expired, value: expired, color: '#EF4444' }
  ].filter(item => item.value > 0);

  }, [selectedBranch, t]);
  
  return (
    <div className="dashboard-page">

      <PageHeader
        title={t.title}
        description={t.description}
        icon={Activity}
      />

      {/* Stats */}
      <div className="stats-grid">
        <DashboardCard title={t.totalEmployees} value={stats.totalEmployees} icon={Users} />
        <DashboardCard title={t.totalCompanyDocuments} value={stats.totalCompanyDocuments} icon={Building2} />
        <DashboardCard title={t.totalEmployeeDocuments} value={stats.totalEmployeeDocuments} icon={UserCheck} />
        <DashboardCard title={t.totalVehicleDocuments} value={stats.totalVehicleDocuments} icon={Car} />
        <DashboardCard title={t.expiringDocuments} value={stats.expiringDocuments} icon={AlertCircle} color="warning" />
        <DashboardCard title={t.expiredDocuments} value={stats.expiredDocuments} icon={AlertCircle} color="danger" />
      </div>
  
      <div className="charts-grid">
        {/* Status Distribution */}
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
{/* Company Document Status Distribution */}
<div className="chart-card">
  <h3>Company Document Status Distribution</h3>
  <div className="chart-container">
    {companyStatusChartData.length > 0 ? (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={companyStatusChartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {companyStatusChartData.map((entry, index) => (
              <Cell key={`cell-company-${index}`} fill={entry.color} />
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
        
        {/* Vehicle Document Status Distribution */}
<div className="chart-card">
  <h3>Vehicle Document Status Distribution</h3>
  <div className="chart-container">
    {vehicleStatusChartData.length > 0 ? (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={vehicleStatusChartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {vehicleStatusChartData.map((entry, index) => (
              <Cell key={`cell-vehicle-${index}`} fill={entry.color} />
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
        
        {/* Department Compliance */}
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

      {/* Expiring Table */}
      <div className="expiring-section">
        <h2>{t.recentExpiringDocuments}</h2>

        {expiringDocuments.length > 0 ? (
          <table className="expiring-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Document</th>
                <th>Expiry</th>
                <th>Days</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {expiringDocuments.map(doc => (
                <tr key={doc.documentId}>
                  <td>{getEmployeeName(doc.employeeId)}</td>
                  <td>{doc.documentType}</td>
                  <td>{formatDateToDisplay(doc.expiryDate)}</td>
                  <td>{calculateDaysRemaining(doc.expiryDate)} days</td>
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
            <p>All documents are valid</p>
          </div>
        )}

      </div>

    </div>
  );
};

export default Dashboard;