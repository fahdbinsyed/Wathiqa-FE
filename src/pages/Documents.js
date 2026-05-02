// pages/Documents.js
import React, { useState, useMemo } from 'react';
import { FileText, Plus } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import DocumentTable from '../components/DocumentTable';
import DocumentForm from '../components/DocumentForm';
import { useDocuments } from '../hooks/useDocuments';
import { useEmployees } from '../hooks/useEmployees';
import { useSettings } from '../hooks/useSettings';
import '../styles/Documents.css';

const Documents = () => {
  const {
    documents,
    addDocument,
    updateDocument,
    deleteDocument,
    filterByType,
    filterByStatus,
    filterByBranch
  } = useDocuments();

  const { employees } = useEmployees();
  const { language, selectedBranch } = useSettings();

  const [showForm, setShowForm] = useState(false);
  const [editingDocument, setEditingDocument] = useState(null); // ✅ NEW
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const translations = {
    en: {
      title: 'Documents',
      description: 'Manage all employee documents',
      addDocument: 'Add Document',
      allTypes: 'All Types',
      allStatuses: 'All Statuses',
      search: 'Search...',
      typeFilter: 'Filter by Type',
      statusFilter: 'Filter by Status'
    },
    ar: {
      title: 'المستندات',
      description: 'إدارة جميع مستندات الموظفين',
      addDocument: 'إضافة مستند',
      allTypes: 'جميع الأنواع',
      allStatuses: 'جميع الحالات',
      search: 'بحث...',
      typeFilter: 'تصفية حسب النوع',
      statusFilter: 'تصفية حسب الحالة'
    }
  };

  const t = translations[language] || translations.en;

  const documentTypes = [...new Set(documents.map(d => d.documentType))];
  const statuses = [...new Set(documents.map(d => d.status))];

  const filteredDocuments = useMemo(() => {
    let filtered = documents;

    // Branch filter
    if (selectedBranch && selectedBranch !== 'All') {
      filtered = filterByBranch(selectedBranch, employees);
    }

    if (typeFilter) {
      filtered = filterByType(typeFilter);
    }

    if (statusFilter) {
      filtered = filterByStatus(statusFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(doc =>
        doc.documentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.documentType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.issuingAuthority.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [
    documents,
    typeFilter,
    statusFilter,
    searchQuery,
    filterByType,
    filterByStatus,
    filterByBranch,
    selectedBranch,
    employees
  ]);

  // ✅ Handle Edit Click
  const handleEditDocument = (doc) => {
    setEditingDocument(doc);
    setShowForm(true);
  };

  // ✅ Handle Add / Update
  const handleSubmitDocument = (formData) => {
    if (editingDocument) {
      updateDocument(editingDocument.documentId, formData);
    } else {
      addDocument(formData);
    }

    setEditingDocument(null);
    setShowForm(false);
  };

  // ✅ Handle Add button click
  const handleOpenAddForm = () => {
    setEditingDocument(null);
    setShowForm(true);
  };

  return (
    <div className="documents-page">
      <PageHeader
        title={t.title}
        description={t.description}
        icon={FileText}
        actions={
          <button className="btn btn-primary" onClick={handleOpenAddForm}>
            <Plus size={20} />
            {t.addDocument}
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
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="filter-select"
          title={t.typeFilter}
        >
          <option value="">{t.allTypes}</option>
          {documentTypes.map((type) => (
            <option key={type} value={type}>
              {type}
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

      {/* Table */}
      <DocumentTable
        documents={filteredDocuments}
        employees={employees}
        onEdit={handleEditDocument}   // ✅ FIXED
        onDelete={deleteDocument}
      />

      {/* Form Modal */}
      {showForm && (
        <DocumentForm
          document={editingDocument}   // ✅ FIXED
          employees={employees}
          onSubmit={handleSubmitDocument}   // ✅ FIXED
          onCancel={() => {
            setShowForm(false);
            setEditingDocument(null);
          }}
        />
      )}
    </div>
  );
};

export default Documents;