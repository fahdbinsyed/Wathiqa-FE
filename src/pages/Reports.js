// pages/Reports.js
import React, { useState, useMemo } from 'react';
import { BarChart3, Download } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useEmployees } from '../hooks/useEmployees';
import { useDocuments } from '../hooks/useDocuments';
import { useSettings } from '../hooks/useSettings';
import { formatDateToDisplay } from '../utils/dateUtils';
import StatusBadge from '../components/StatusBadge';
import '../styles/Reports.css';

const Reports = () => {
  const { employees } = useEmployees();
  const { documents } = useDocuments();
  const { language } = useSettings();
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const translations = {
    en: {
      title: 'Reports',
      description: 'Generate and view compliance reports',
      filter: 'Filter by',
      department: 'Department',
      type: 'Document Type',
      status: 'Status',
      allOptions: 'All',
      export: 'Export Report',
      employee: 'Employee',
      documentType: 'Document Type',
      expiryDate: 'Expiry Date',
      documentStatus: 'Status',
      department: 'Department',
      compliance: 'Compliance Summary',
      totalDocs: 'Total Documents',
      validDocs: 'Valid Documents',
      expiringDocs: 'Expiring Soon',
      expiredDocs: 'Expired Documents',
      complianceRate: 'Compliance Rate'
    },
    ar: {
      title: 'التقارير',
      description: 'إنشfesta وعرض تقارير الامتثال',
      filter: 'تصفية حسب',
      department: 'القسم',
      type: 'نوع المستند',
      status: 'الحالة',
      allOptions: 'الكل',
      export: 'تصدير التقرير',
      employee: 'الموظف',
      documentType: 'نوع المستند',
      expiryDate: 'تاريخ انتهاء الصلاحية',
      documentStatus: 'الحالة',
      department: 'القسم',
      compliance: 'ملخص الامتثال',
      totalDocs: 'إجمالي المستندات',
      validDocs: 'مستندات صحيحة',
      expiringDocs: 'تنتهي قريباً',
      expiredDocs: 'منتهية الصلاحية',
      complianceRate: 'معدل الامتثال'
    }
  };

  const t = translations[language] || translations.en;

  const departments = [...new Set(employees.map(e => e.department))];
  const documentTypes = [...new Set(documents.map(d => d.documentType))];
  const statuses = [...new Set(documents.map(d => d.status))];

  const getEmployeeName = (employeeId) => {
    const emp = employees.find(e => e.employeeId === employeeId);
    return emp ? emp.fullName : 'Unknown';
  };

  const getEmployeeDept = (employeeId) => {
    const emp = employees.find(e => e.employeeId === employeeId);
    return emp ? emp.department : 'Unknown';
  };

  const filteredDocuments = useMemo(() => {
    return documents.filter(doc => {
      if (typeFilter && doc.documentType !== typeFilter) return false;
      if (statusFilter && doc.status !== statusFilter) return false;
      if (departmentFilter && getEmployeeDept(doc.employeeId) !== departmentFilter) return false;
      return true;
    });
  }, [documents, typeFilter, statusFilter, departmentFilter]);

  const complianceSummary = useMemo(() => {
    return {
      totalDocs: filteredDocuments.length,
      validDocs: filteredDocuments.filter(d => d.status === 'Valid').length,
      expiringDocs: filteredDocuments.filter(d => d.status === 'Expiring Soon').length,
      expiredDocs: filteredDocuments.filter(d => d.status === 'Expired').length,
      complianceRate: filteredDocuments.length > 0 
        ? Math.round((filteredDocuments.filter(d => d.status === 'Valid').length / filteredDocuments.length) * 100)
        : 0
    };
  }, [filteredDocuments]);

  const handleExport = () => {
    const csv = [
      ['Employee', 'Department', 'Document Type', 'Expiry Date', 'Status'],
      ...filteredDocuments.map(doc => [
        getEmployeeName(doc.employeeId),
        getEmployeeDept(doc.employeeId),
        doc.documentType,
        formatDateToDisplay(doc.expiryDate),
        doc.status
      ])
    ];

    const csvContent = csv.map(row => row.join(',')).join('\n');
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent));
    element.setAttribute('download', 'report.csv');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="reports-page">
      <PageHeader
        title={t.title}
        description={t.description}
        icon={BarChart3}
        actions={
          <button className="btn btn-primary" onClick={handleExport}>
            <Download size={20} />
            {t.export}
          </button>
        }
      />

      {/* Filters */}
      <div className="filters-bar">
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Document Types</option>
          {documentTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Statuses</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Compliance Summary */}
      <div className="summary-grid">
        <div className="summary-card">
          <div className="summary-label">{t.totalDocs}</div>
          <div className="summary-value">{complianceSummary.totalDocs}</div>
        </div>
        <div className="summary-card success">
          <div className="summary-label">{t.validDocs}</div>
          <div className="summary-value">{complianceSummary.validDocs}</div>
        </div>
        <div className="summary-card warning">
          <div className="summary-label">{t.expiringDocs}</div>
          <div className="summary-value">{complianceSummary.expiringDocs}</div>
        </div>
        <div className="summary-card danger">
          <div className="summary-label">{t.expiredDocs}</div>
          <div className="summary-value">{complianceSummary.expiredDocs}</div>
        </div>
        <div className="summary-card highlight">
          <div className="summary-label">{t.complianceRate}</div>
          <div className="summary-value">{complianceSummary.complianceRate}%</div>
        </div>
      </div>

      {/* Report Table */}
      <div className="report-table-wrapper">
        <table className="report-table">
          <thead>
            <tr>
              <th>{t.employee}</th>
              <th>{t.department}</th>
              <th>{t.documentType}</th>
              <th>{t.expiryDate}</th>
              <th>{t.documentStatus}</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocuments.map((doc) => (
              <tr key={doc.documentId}>
                <td className="emp-name">{getEmployeeName(doc.employeeId)}</td>
                <td>{getEmployeeDept(doc.employeeId)}</td>
                <td>{doc.documentType}</td>
                <td>{formatDateToDisplay(doc.expiryDate)}</td>
                <td>
                  <StatusBadge status={doc.status} size="small" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
