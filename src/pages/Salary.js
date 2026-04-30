// pages/Salary.js
import React, { useState, useMemo } from 'react';
import { DollarSign, Plus, TrendingUp, Download, Calculator, Search } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import DashboardCard from '../components/DashboardCard';
import { useEmployees } from '../hooks/useEmployees';
import { useDocuments } from '../hooks/useDocuments';
import { useSettings } from '../hooks/useSettings';
import '../styles/Salary.css';

const Salary = () => {
  const { employees } = useEmployees();
  const { documents } = useDocuments();
  const { language, selectedBranch } = useSettings();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDept, setFilterDept] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const translations = {
    en: {
      title: 'Salary Management',
      description: 'Calculate and manage employee salaries based on attendance',
      basicSalary: 'Basic Salary',
      allowances: 'Allowances',
      deductions: 'Deductions',
      netSalary: 'Net Salary',
      exportAll: 'Export All Salaries',
      calculate: 'Calculate Salary',
      searchPlaceholder: 'Search by name or Iqama ID',
      allEmployees: 'All Employees',
      iqamaId: 'Iqama ID',
      name: 'Name',
      department: 'Department',
      branch: 'Branch',
      position: 'Position',
      calculatedSalary: 'Calculated Salary',
      total: 'Total',
      month: 'Month',
      year: 'Year',
    },
    ar: {
      title: 'إدارة الرواتب',
      description: 'احتساب وإدارة رواتب الموظفين بناءً على الحضور',
      basicSalary: 'الراتب الأساسي',
      allowances: 'البدلات',
      deductions: 'الخصومات',
      netSalary: 'صافي الراتب',
      exportAll: 'تصدير جميع الرواتب',
      calculate: 'احتساب الراتب',
      searchPlaceholder: 'البحث بالاسم أو رقم الإقامة',
      allEmployees: 'جميع الموظفين',
      iqamaId: 'رقم الإقامة',
      name: 'الاسم',
      department: 'القسم',
      branch: 'الفرع',
      position: 'المنصب',
      calculatedSalary: 'الراتب المحتسب',
      total: 'الإجمالي',
      month: 'الشهر',
      year: 'السنة',
    }
  };

  const t = translations[language] || translations.en;

  // Get Iqama number from documents
  const getIqamaNumber = (employeeId) => {
    const iqamaDoc = documents.find(
      d => d.employeeId === employeeId && d.documentType === 'Iqama'
    );
    return iqamaDoc ? iqamaDoc.documentNumber : '-';
  };

  // Get branch name from branchId
  const branchNames = {
    BR001: 'Riyadh',
    BR002: 'Jeddah',
    BR003: 'Dammam',
    BR004: 'Mecca',
  };

  const getBranchName = (branchId) => branchNames[branchId] || branchId;

  // Calculate salary per employee
  const calculateSalary = (employee) => {
    const base = 5000 + (employee.employeeId.replace('EMP', '') * 500);
    const allowances = Math.round(base * 0.15);
    const deductions = Math.round(base * 0.1);
    return Math.round(base + allowances - deductions);
  };

  const salaryData = useMemo(() => {
    return employees
      .filter(emp => {
        if (selectedBranch && selectedBranch !== 'All' && emp.branch !== selectedBranch) return false;
        if (filterDept !== 'All' && emp.department !== filterDept) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const iqama = getIqamaNumber(emp.employeeId).toLowerCase();
          return (
            emp.fullName.toLowerCase().includes(q) ||
            iqama.includes(q)
          );
        }
        return true;
      })
      .map(emp => ({
        employeeId: emp.employeeId,
        iqamaNumber: getIqamaNumber(emp.employeeId),
        fullName: emp.fullName,
        department: emp.department,
        branch: getBranchName(emp.branch),
        jobTitle: emp.jobTitle,
        calculatedSalary: calculateSalary(emp),
        status: emp.employeeStatus,
      }));
  }, [employees, documents, selectedBranch, filterDept, searchQuery]);

  const stats = useMemo(() => {
    const totalBase       = salaryData.reduce((s, e) => s + e.calculatedSalary, 0);
    const totalAllowances = salaryData.reduce((s, e) => s + Math.round(e.calculatedSalary * 0.15), 0);
    const totalDeductions = salaryData.reduce((s, e) => s + Math.round(e.calculatedSalary * 0.1), 0);
    const totalNet        = salaryData.reduce((s, e) => s + e.calculatedSalary, 0);
    return { totalBase, totalAllowances, totalDeductions, totalNet };
  }, [salaryData]);

  const departments = useMemo(() => {
    const depts = [...new Set(employees.map(e => e.department))];
    return ['All', ...depts];
  }, [employees]);

  const months = language === 'ar'
    ? ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر']
    : ['January','February','March','April','May','June','July','August','September','October','November','December'];

  const formatCurrency = (amount) =>
    `${Number(amount).toFixed(2)} SAR`;

  return (
    <div className="salary-page">
      <PageHeader title={t.title} description={t.description} />

      {/* Stats */}
      {/* <div className="salary-stats-grid">
        <DashboardCard title={t.basicSalary}  value={formatCurrency(stats.totalBase)}       icon={DollarSign}  color="primary" />
        <DashboardCard title={t.allowances}   value={formatCurrency(stats.totalAllowances)} icon={Plus}        color="success" />
        <DashboardCard title={t.deductions}   value={formatCurrency(stats.totalDeductions)} icon={TrendingUp}  color="danger"  />
        <DashboardCard title={t.netSalary}    value={formatCurrency(stats.totalNet)}        icon={DollarSign}  color="warning" />
      </div> */}

      {/* Toolbar */}
      <div className="salary-toolbar">
        <div className="salary-toolbar-left">
          <div className="salary-search-wrapper">
            <Search size={16} className="salary-search-icon" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="salary-search-input"
            />
          </div>
          <select
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            className="salary-filter-select"
          >
            {departments.map(d => (
              <option key={d} value={d}>{d === 'All' ? t.allEmployees : d}</option>
            ))}
          </select>
        </div>

        <div className="salary-toolbar-right">
          <button className="salary-btn salary-btn-outline">
            <Download size={16} />
            {t.exportAll}
          </button>
          <button className="salary-btn salary-btn-primary">
            <Calculator size={16} />
            {t.calculate}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="salary-table-container">
        <table className="salary-table">
          <thead>
            <tr>
              <th>{t.iqamaId}</th>
              <th>{t.name}</th>
              <th>{t.department}</th>
              <th>{t.branch}</th>
              <th>{t.position}</th>
              <th>{t.calculatedSalary}</th>
            </tr>
          </thead>
          <tbody>
            {salaryData.map((record) => (
              <tr key={record.employeeId}>
                <td className="salary-iqama">{record.iqamaNumber}</td>
                <td className="salary-name">{record.fullName}</td>
                <td>{record.department}</td>
                <td>{record.branch}</td>
                <td>{record.jobTitle}</td>
                <td className="salary-net-cell">{formatCurrency(record.calculatedSalary)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Salary;