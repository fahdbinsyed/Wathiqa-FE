// EmployeeContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { mockEmployees } from '../data/mockEmployees';


export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem('employees');
    const parsed = saved ? JSON.parse(saved) : null;
    
    // If we have saved data and it matches the new schema (has iqamaId)
    if (parsed && parsed.length > 0 && parsed[0].iqamaId) {
      return parsed.map(emp => ({
        ...emp,
        branch: emp.branch || 'BR001'
      }));
    }
    
    return mockEmployees;
  });

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  const addEmployee = useCallback((employee) => {
    setEmployees([...employees, employee]);
    return employee;
  }, [employees]);

  const updateEmployee = useCallback((iqamaId, updatedEmployee) => {
    setEmployees(employees.map(emp => 
      emp.iqamaId === iqamaId ? { ...emp, ...updatedEmployee } : emp
    ));
  }, [employees]);

  const deleteEmployee = useCallback((iqamaId) => {
    setEmployees(employees.filter(emp => emp.iqamaId !== iqamaId));
  }, [employees]);

  const getEmployeeByIqamaId = useCallback((iqamaId) => {
    return employees.find(emp => emp.iqamaId === iqamaId);
  }, [employees]);

  const searchEmployees = useCallback((query) => {
    if (!query.trim()) return employees;
    
    const lowerQuery = query.toLowerCase();
    return employees.filter(emp =>
      emp.fullName.toLowerCase().includes(lowerQuery) ||
      emp.iqamaId.toLowerCase().includes(lowerQuery) ||
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
    getEmployeeByIqamaId,
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
