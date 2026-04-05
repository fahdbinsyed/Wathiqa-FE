// components/EmployeeTable.js
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Trash2, Edit2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/dateUtils';
import '../styles/EmployeeTable.css';

const EmployeeTable = ({ employees, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  if (employees.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">👥</div>
        <div className="empty-state-title">No employees found</div>
        <div className="empty-state-description">Add your first employee to get started</div>
      </div>
    );
  }

  const totalPages = Math.ceil(employees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEmployees = employees.slice(startIndex, endIndex);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const getStatusColor = (status) => {
    const colors = {
      Active: '#22C55E',
      'On Leave': '#F59E0B',
      Exit: '#EF4444'
    };
    return colors[status] || '#6B7280';
  };

  return (
    <div className="employee-table-wrapper">
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Department</th>
            <th>Job Title</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedEmployees.map((employee) => (
            <tr key={employee.employeeId}>
              <td>
                <div className="employee-cell">
                  <img
                    src={employee.profilePhoto}
                    alt={employee.fullName}
                    className="employee-avatar"
                  />
                  <span>{employee.fullName}</span>
                </div>
              </td>
              <td className="mono">{employee.employeeId}</td>
              <td>{employee.department}</td>
              <td>{employee.jobTitle}</td>
              <td className="email">{employee.email}</td>
              <td>
                <span
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(employee.employeeStatus) + '20', color: getStatusColor(employee.employeeStatus) }}
                >
                  {employee.employeeStatus}
                </span>
              </td>
              <td>
                <div className="action-buttons">
                  <Link
                    to={`/employees/${employee.employeeId}`}
                    className="action-btn view-btn"
                    title="View"
                  >
                    <Eye size={16} />
                  </Link>
                  <button
                    className="action-btn edit-btn"
                    onClick={() => onEdit(employee)}
                    title="Edit"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => onDelete(employee.employeeId)}
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="table-pagination">
          <button onClick={handlePrevious} disabled={currentPage === 1} className="pagination-btn">
            <ChevronLeft size={18} />
          </button>
          <span className="pagination-info">
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={handleNext} disabled={currentPage === totalPages} className="pagination-btn">
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;
