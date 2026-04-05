// components/DocumentForm.js
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import '../styles/DocumentForm.css';

const DocumentForm = ({ document, employees, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    employeeId: '',
    documentType: 'Iqama',
    documentNumber: '',
    issueDate: '',
    expiryDate: '',
    issuingAuthority: '',
    documentFile: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (document) {
      setFormData({
        ...document,
        expiryDate: document.expiryDate instanceof Date 
          ? document.expiryDate.toISOString().split('T')[0]
          : typeof document.expiryDate === 'string'
          ? document.expiryDate.split('T')[0]
          : ''
      });
    }
  }, [document]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.employeeId) newErrors.employeeId = 'Employee is required';
    if (!formData.documentNumber.trim()) newErrors.documentNumber = 'Document number is required';
    if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        expiryDate: formData.expiryDate ? new Date(formData.expiryDate) : null
      });
    }
  };

  const documentTypes = [
    'Iqama',
    'Passport',
    'Medical Insurance',
    'Baladiya Card',
    'Driving License',
    'Visa Copy',
    'Contract Copy',
    'Other'
  ];

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content document-form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{document ? 'Edit Document' : 'Add Document'}</h2>
          <button className="modal-close-btn" onClick={onCancel}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="document-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Employee *</label>
              <select name="employeeId" value={formData.employeeId} onChange={handleChange}>
                <option value="">Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp.employeeId} value={emp.employeeId}>
                    {emp.fullName}
                  </option>
                ))}
              </select>
              {errors.employeeId && <span className="error-message">{errors.employeeId}</span>}
            </div>

            <div className="form-group">
              <label>Document Type</label>
              <select name="documentType" value={formData.documentType} onChange={handleChange}>
                {documentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Document Number *</label>
              <input
                type="text"
                name="documentNumber"
                value={formData.documentNumber}
                onChange={handleChange}
                placeholder="Enter document number"
              />
              {errors.documentNumber && <span className="error-message">{errors.documentNumber}</span>}
            </div>

            <div className="form-group">
              <label>Issuing Authority</label>
              <input
                type="text"
                name="issuingAuthority"
                value={formData.issuingAuthority}
                onChange={handleChange}
                placeholder="Enter issuing authority"
              />
            </div>

            <div className="form-group">
              <label>Issue Date</label>
              <input
                type="date"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Expiry Date *</label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
              />
              {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
            </div>

            <div className="form-group">
              <label>Document File</label>
              <input
                type="text"
                name="documentFile"
                value={formData.documentFile}
                onChange={handleChange}
                placeholder="Enter file name"
              />
            </div>

            <div className="form-group">
              <label>Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Enter any notes"
                rows={3}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {document ? 'Update Document' : 'Add Document'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DocumentForm;
