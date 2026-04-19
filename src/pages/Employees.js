// pages/Employees.js
import React, { useState, useMemo } from 'react';
import { Users, Plus, Trash2, AlertCircle, CheckCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import DashboardCard from '../components/DashboardCard';
import StatusBadge from '../components/StatusBadge';
import EmployeeTable from '../components/EmployeeTable';
import EmployeeForm from '../components/EmployeeForm';
import { useEmployees } from '../hooks/useEmployees';
import { useDocuments } from '../hooks/useDocuments';
import { useSettings } from '../hooks/useSettings';
import { formatDateToDisplay, calculateDaysRemaining } from '../utils/dateUtils';
import '../styles/Employees.css';
import '../styles/Dashboard.css';

const Employees = () => {
  const { employees, addEmployee, updateEmployee, deleteEmployee, searchEmployees } = useEmployees();
  const { documents } = useDocuments();
  const { language, selectedBranch } = useSettings();
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [branchFilter, setBranchFilter] = useState('');

  const translations = {
    en: {
      title: 'Employees',
      description: 'Manage your employee database',
      addEmployee: 'Add Employee',
      search: 'Search...',
      allDepartments: 'All Departments',
      allStatuses: 'All Statuses',
      deleteConfirm: 'Are you sure?',
      deletingEmployee: 'This employee will be permanently deleted.',
      cancel: 'Cancel',
      delete: 'Delete',
      departmentFilter: 'Filter by Department',
      statusFilter: 'Filter by Status',
      totalEmployees: 'Total Employees',
      expiringDocuments: 'Documents Expiring Soon',
      expiredDocuments: 'Expired Documents',
      recentExpiringDocuments: 'Recently Expiring Employee Documents',
      allBranches: 'All Branches',
      branchFilter: 'Filter by Branch'
    },
    ar: {
      title: 'الموظفون',
      description: 'إدارة قاعدة بيانات الموظفين',
      addEmployee: 'إضافة موظف',
      search: 'بحث...',
      allDepartments: 'جميع الأقسام',
      allStatuses: 'جميع الحالات',
      deleteConfirm: 'هل أنت متأكد؟',
      deletingEmployee: 'سيتم حذف هذا الموظف بشكل دائم.',
      cancel: 'إلغاء',
      delete: 'حذف',
      departmentFilter: 'تصفية حسب القسم',
      statusFilter: 'تصفية حسب الحالة',
      totalEmployees: 'إجمالي الموظفين',
      expiringDocuments: 'المستندات التي تنتهي قريباً',
      expiredDocuments: 'المستندات المنتهية الصلاحية',
      recentExpiringDocuments: 'مستندات الموظفين التي تنتهي مؤخراً',
      allBranches: 'جميع الفروع',
      branchFilter: 'تصفية حسب الفرع'
    }
  };

  const t = translations[language] || translations.en;

  const departments = [...new Set(employees.map(e => e.department))];
  const statuses = [...new Set(employees.map(e => e.employeeStatus))];
  const branches = [...new Map(employees.map((e) => [e.branchId, e.branchName])).entries()]
    .map(([id, name]) => ({ id, name }))
    .filter((branch) => branch.id)
    .sort((a, b) => a.name.localeCompare(b.name));

  const filteredEmployees = useMemo(() => {
    let filtered = searchEmployees(searchQuery);
    
    if (departmentFilter) {
      filtered = filtered.filter(emp => emp.department === departmentFilter);
    }
    
    if (statusFilter) {
      filtered = filtered.filter(emp => emp.employeeStatus === statusFilter);
    }
    
    if (branchFilter) {
      filtered = filtered.filter(emp => emp.branchId === branchFilter);
    }
    
    return filtered;
  }, [searchQuery, departmentFilter, statusFilter, branchFilter, searchEmployees]);

  const filteredEmployeesByBranch = useMemo(() => {
    if (!selectedBranch || selectedBranch === 'All') return employees;
    return employees.filter(emp => emp.branchId === selectedBranch);
  }, [employees, selectedBranch]);

  const filteredDocuments = useMemo(() => {
    if (!selectedBranch || selectedBranch === 'All') return documents;
    return documents.filter(doc => doc.branchId === selectedBranch);
  }, [documents, selectedBranch]);

  const stats = useMemo(() => {
    const expiringCount = filteredDocuments.filter(d => d.status === 'Expiring Soon').length;
    const expiredCount = filteredDocuments.filter(d => d.status === 'Expired').length;

    return {
      totalEmployees: filteredEmployeesByBranch.length,
      expiringDocuments: expiringCount,
      expiredDocuments: expiredCount
    };
  }, [filteredDocuments, filteredEmployeesByBranch]);

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

  const handleAddEmployee = (formData) => {
    addEmployee({
      ...formData,
      profilePhoto: formData.profilePhoto
    });
    setShowForm(false);
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleUpdateEmployee = (formData) => {
    if (editingEmployee) {
      updateEmployee(editingEmployee.employeeId, formData);
      setEditingEmployee(null);
      setShowForm(false);
    }
  };

  const handleDeleteEmployee = (employeeId) => {
    if (window.confirm(t.deleteConfirm)) {
      deleteEmployee(employeeId);
    }
  };

  const handleFormSubmit = (formData) => {
    if (editingEmployee) {
      handleUpdateEmployee(formData);
    } else {
      handleAddEmployee(formData);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingEmployee(null);
  };

  return (
    <div className="employees-page">
      <PageHeader
        title={t.title}
        description={t.description}
        icon={Users}
        actions={
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            <Plus size={20} />
            {t.addEmployee}
          </button>
        }
      />

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

      {/* Filters */}
      <div className="filters-bar">
        <input
          type="text"
          placeholder={t.search}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="filter-input"
        />
        
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="filter-select"
          title={t.departmentFilter}
        >
          <option value="">{t.allDepartments}</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-select"
          title={t.statusFilter}
        >
          <option value="">{t.allStatuses}</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <select
          value={branchFilter}
          onChange={(e) => setBranchFilter(e.target.value)}
          className="filter-select"
          title={t.branchFilter}
        >
          <option value="">{t.allBranches}</option>
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>
              {branch.name}
            </option>
          ))}
        </select>
      </div>

      {/* Employee Table */}
      <EmployeeTable
        employees={filteredEmployees}
        onEdit={handleEditEmployee}
        onDelete={handleDeleteEmployee}
      />

      {/* Employee Form Modal */}
      {showForm && (
        <EmployeeForm
          employee={editingEmployee}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}
    </div>
  );
};

export default Employees;
