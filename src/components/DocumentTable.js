// components/DocumentTable.js
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Trash2, Edit2 } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { useSettings } from '../hooks/useSettings';
import { formatDate, calculateDaysRemaining } from '../utils/dateUtils';
import '../styles/DocumentTable.css';

const DocumentTable = ({ documents, employees, onEdit, onDelete }) => {
  const { reminderDays } = useSettings();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  if (documents.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📄</div>
        <div className="empty-state-title">No documents found</div>
        <div className="empty-state-description">Add your first document to get started</div>
      </div>
    );
  }

  const totalPages = Math.ceil(documents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedDocuments = documents.slice(startIndex, endIndex);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const getEmployeeName = (employeeId) => {
    const employee = employees.find((emp) => emp.employeeId === employeeId);
    return employee ? employee.fullName : 'Unknown';
  };

  return (
    <div className="document-table-wrapper">
      <div className="document-table-scroll">
        <table className="document-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Document Type</th>
              <th>Document Number</th>
              <th>Expiry Date</th>
              <th>Days Remaining</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedDocuments.map((document) => {
              const daysRemaining = calculateDaysRemaining(document.expiryDate);
              return (
                <tr key={document.documentId}>
                  <td>{getEmployeeName(document.employeeId)}</td>
                  <td>{document.documentType}</td>
                  <td className="mono">{document.documentNumber}</td>
                  <td>{formatDate(document.expiryDate)}</td>
                  <td>
                    <span className={`days-remaining ${daysRemaining < 0 ? 'expired' : daysRemaining <= reminderDays ? 'expiring' : 'valid'}`}>
                      {daysRemaining < 0 ? `${Math.abs(daysRemaining)} days ago` : `${daysRemaining} days`}
                    </span>
                  </td>
                  <td>
                    <StatusBadge status={document.status} size="small" />
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="action-btn edit-btn"
                        onClick={() => onEdit(document)}
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className="action-btn delete-btn"
                        onClick={() => onDelete(document.documentId)}
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

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

export default DocumentTable;
