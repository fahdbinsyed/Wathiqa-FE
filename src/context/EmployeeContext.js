// EmployeeContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { mockEmployees } from '../data/mockEmployees';

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem('employees');
    return saved ? JSON.parse(saved) : mockEmployees;
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

  const value = {
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeById,
    searchEmployees,
    filterByDepartment,
    filterByStatus
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};
