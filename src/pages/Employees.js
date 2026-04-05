// pages/Employees.js
import React, { useState, useMemo } from 'react';
import { Users, Plus, Trash2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import EmployeeTable from '../components/EmployeeTable';
import EmployeeForm from '../components/EmployeeForm';
import { useEmployees } from '../hooks/useEmployees';
import { useSettings } from '../hooks/useSettings';
import '../styles/Employees.css';

const Employees = () => {
  const { employees, addEmployee, updateEmployee, deleteEmployee, searchEmployees } = useEmployees();
  const { language } = useSettings();
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

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
      statusFilter: 'Filter by Status'
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
      statusFilter: 'تصفية حسب الحالة'
    }
  };

  const t = translations[language] || translations.en;

  const departments = [...new Set(employees.map(e => e.department))];
  const statuses = [...new Set(employees.map(e => e.employeeStatus))];

  const filteredEmployees = useMemo(() => {
    let filtered = searchEmployees(searchQuery);
    
    if (departmentFilter) {
      filtered = filtered.filter(emp => emp.department === departmentFilter);
    }
    
    if (statusFilter) {
      filtered = filtered.filter(emp => emp.employeeStatus === statusFilter);
    }
    
    return filtered;
  }, [searchQuery, departmentFilter, statusFilter, searchEmployees]);

  const handleAddEmployee = (formData) => {
    addEmployee({
      ...formData,
      profilePhoto: formData.profilePhoto || `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.fullName}`
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
