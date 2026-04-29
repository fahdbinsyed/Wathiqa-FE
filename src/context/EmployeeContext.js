// EmployeeContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { mockEmployees } from '../data/mockEmployees';

// Branch mapping for migration
const branchMapping = {
  'EMP001': 'BR001',
  'EMP002': 'BR001',
  'EMP003': 'BR001',
  'EMP004': 'BR002',
  'EMP005': 'BR002',
  'EMP006': 'BR003',
  'EMP007': 'BR003',
  'EMP008': 'BR004',
  'EMP009': 'BR001',
  'EMP010': 'BR002'
};

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem('employees');
    const parsed = saved ? JSON.parse(saved) : null;
    
    // If we have saved data, ensure all employees have branch field
    if (parsed) {
      return parsed.map(emp => ({
        ...emp,
        branch: emp.branch || branchMapping[emp.employeeId] || 'BR001'
      }));
    }
    
    return mockEmployees;
  });

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  const addEmployee = useCallback((employee) => {
    const newEmployee = {
      ...employee,
      employeeId: `EMP${String(Math.max(...employees.map(e => parseInt(e.employeeId.replace('EMP', '')) || 0)) + 1).padStart(3, '0')}`
    };
    setEmployees([...employees, newEmployee]);
    return newEmployee;
  }, [employees]);

  const updateEmployee = useCallback((employeeId, updatedEmployee) => {
    setEmployees(employees.map(emp => 
      emp.employeeId === employeeId ? { ...emp, ...updatedEmployee } : emp
    ));
  }, [employees]);

  const deleteEmployee = useCallback((employeeId) => {
    setEmployees(employees.filter(emp => emp.employeeId !== employeeId));
  }, [employees]);

  const getEmployeeById = useCallback((employeeId) => {
    return employees.find(emp => emp.employeeId === employeeId);
  }, [employees]);

  const searchEmployees = useCallback((query) => {
    if (!query.trim()) return employees;
    
    const lowerQuery = query.toLowerCase();
    return employees.filter(emp =>
      emp.fullName.toLowerCase().includes(lowerQuery) ||
      emp.employeeId.toLowerCase().includes(lowerQuery) ||
      emp.email.toLowerCase().includes(lowerQuery)
    );
  }, [employees]);

  const filterByDepartment = useCallback((department) => {
    if (!department) return employees;
    return employees.filter(emp => emp.department === department);
  }, [employees]);

  const filterByStatus = useCallback((status) => {
    if (!status) return employees;
    return employees.filter(emp => emp.employeeStatus === status);
  }, [employees]);

  const filterByBranch = useCallback((branch) => {
    if (!branch || branch === 'All') return employees;
    return employees.filter(emp => emp.branch === branch);
  }, [employees]);

  const value = {
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeById,
    searchEmployees,
    filterByDepartment,
    filterByStatus,
    filterByBranch
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};
