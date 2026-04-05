// pages/EmployeeProfile.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Briefcase, MapPin, Calendar, FileText } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import DocumentTable from '../components/DocumentTable';
import { useEmployees } from '../hooks/useEmployees';
import { useDocuments } from '../hooks/useDocuments';
import { useSettings } from '../hooks/useSettings';
import { formatDate } from '../utils/dateUtils';
import '../styles/EmployeeProfile.css';

const EmployeeProfile = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const { getEmployeeById, employees } = useEmployees();
  const { getDocumentsByEmployeeId, documents, deleteDocument } = useDocuments();
  const { language } = useSettings();

  const employee = getEmployeeById(employeeId);
  const employeeDocuments = getDocumentsByEmployeeId(employeeId);

  const translations = {
    en: {
      personalInfo: 'Personal Information',
      documents: 'Employee Documents',
      dateOfBirth: 'Date of Birth',
      nationality: 'Nationality',
      gender: 'Gender',
      mobile: 'Mobile Number',
      email: 'Email',
      jobInfo: 'Job Information',
      department: 'Department',
      jobTitle: 'Job Title',
      manager: 'Manager',
      joiningDate: 'Joining Date',
      status: 'Status',
      back: 'Back to Employees'
    },
    ar: {
      personalInfo: 'المعلومات الشخصية',
      documents: 'مستندات الموظف',
      dateOfBirth: 'تاريخ الميلاد',
      nationality: 'الجنسية',
      gender: 'الجنس',
      mobile: 'رقم الهاتف المحمول',
      email: 'البريد الإلكتروني',
      jobInfo: 'معلومات الوظيفة',
      department: 'القسم',
      jobTitle: 'المسمى الوظيفي',
      manager: 'المدير',
      joiningDate: 'تاريخ الانضمام',
      status: 'الحالة',
      back: 'العودة إلى الموظفين'
    }
  };

  const t = translations[language] || translations.en;

  if (!employee) {
    return (
      <div className="not-found">
        <div className="not-found-content">
          <h2>Employee Not Found</h2>
          <button className="btn btn-primary" onClick={() => navigate('/employees')}>
            <ArrowLeft size={20} /> {t.back}
          </button>
        </div>
      </div>
    );
  }

  const handleDeleteDocument = (documentId) => {
    if (window.confirm('Are you sure?')) {
      deleteDocument(documentId);
    }
  };

  return (
    <div className="employee-profile-page">
      <button className="back-btn" onClick={() => navigate('/employees')}>
        <ArrowLeft size={20} />
        {t.back}
      </button>

      {/* Header */}
      <div className="profile-header">
        <img
          src={employee.profilePhoto}
          alt={employee.fullName}
          className="profile-photo"
        />
        <div className="profile-header-info">
          <h1>{employee.fullName}</h1>
          <p className="profile-job-title">{employee.jobTitle}</p>
          <div className="profile-badges">
            <span className="badge badge-primary">{employee.department}</span>
            <span className={`badge badge-${employee.employeeStatus === 'Active' ? 'success' : employee.employeeStatus === 'On Leave' ? 'warning' : 'danger'}`}>
              {employee.employeeStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Info Sections */}
      <div className="profile-sections">
        {/* Personal Information */}
        <div className="info-section">
          <h2>{t.personalInfo}</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">{t.dateOfBirth}</span>
              <span className="info-value">{employee.dateOfBirth ? formatDate(employee.dateOfBirth) : 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">{t.nationality}</span>
              <span className="info-value">{employee.nationality || 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">{t.gender}</span>
              <span className="info-value">{employee.gender || 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">{t.mobile}</span>
              <a href={`tel:${employee.mobileNumber}`} className="info-value link">
                {employee.mobileNumber}
              </a>
            </div>
            <div className="info-item full-width">
              <span className="info-label">{t.email}</span>
              <a href={`mailto:${employee.email}`} className="info-value link">
                {employee.email}
              </a>
            </div>
          </div>
        </div>

        {/* Job Information */}
        <div className="info-section">
          <h2>{t.jobInfo}</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">{t.department}</span>
              <span className="info-value">{employee.department}</span>
            </div>
            <div className="info-item">
              <span className="info-label">{t.jobTitle}</span>
              <span className="info-value">{employee.jobTitle}</span>
            </div>
            <div className="info-item">
              <span className="info-label">{t.manager}</span>
              <span className="info-value">{employee.manager || 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">{t.joiningDate}</span>
              <span className="info-value">{employee.joiningDate ? formatDate(employee.joiningDate) : 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">{t.status}</span>
              <span className={`info-value status-badge status-${employee.employeeStatus.toLowerCase().replace(' ', '-')}`}>
                {employee.employeeStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="info-section documents-section">
          <h2>{t.documents} ({employeeDocuments.length})</h2>
          <DocumentTable
            documents={employeeDocuments}
            employees={employees}
            onEdit={() => {}}
            onDelete={handleDeleteDocument}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
