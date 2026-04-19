// pages/ActivityLogs.js
import React, { useState, useMemo } from 'react';
import { Activity, Filter, Search, Download } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useActivityLogs } from '../hooks/useActivityLogs';
import { useSettings } from '../hooks/useSettings';
import { formatDateToDisplay } from '../utils/dateUtils';
import '../styles/ActivityLogs.css';

const ActivityLogs = () => {
  const { activities, filterActivities } = useActivityLogs();
  const { language } = useSettings();
  const [filters, setFilters] = useState({
    userName: '',
    action: '',
    entityType: '',
    dateFrom: '',
    dateTo: ''
  });
  const [searchQuery, setSearchQuery] = useState('');

  const translations = {
    en: {
      title: 'Activity Logs',
      description: 'Track all user activities and document operations',
      search: 'Search activities...',
      filterByUser: 'Filter by User',
      filterByAction: 'Filter by Action',
      filterByEntity: 'Filter by Entity Type',
      dateFrom: 'From Date',
      dateTo: 'To Date',
      user: 'User',
      action: 'Action',
      entityType: 'Entity Type',
      entityId: 'Entity ID',
      timestamp: 'Timestamp',
      noActivities: 'No activities found',
      view: 'View',
      add: 'Add',
      edit: 'Edit',
      renew: 'Renew',
      employee: 'Employee',
      company: 'Company',
      vehicle: 'Vehicle'
    },
    ar: {
      title: 'سجلات الأنشطة',
      description: 'تتبع جميع أنشطة المستخدمين وعمليات المستندات',
      search: 'البحث في الأنشطة...',
      filterByUser: 'تصفية حسب المستخدم',
      filterByAction: 'تصفية حسب الإجراء',
      filterByEntity: 'تصفية حسب نوع الكيان',
      dateFrom: 'من تاريخ',
      dateTo: 'إلى تاريخ',
      user: 'المستخدم',
      action: 'الإجراء',
      entityType: 'نوع الكيان',
      entityId: 'معرف الكيان',
      timestamp: 'الوقت',
      noActivities: 'لم يتم العثور على أنشطة',
      view: 'عرض',
      add: 'إضافة',
      edit: 'تعديل',
      renew: 'تجديد',
      employee: 'موظف',
      company: 'شركة',
      vehicle: 'مركبة'
    }
  };

  const t = translations[language] || translations.en;

  const filteredActivities = useMemo(() => {
    let filtered = filterActivities(filters);

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(activity =>
        activity.userName.toLowerCase().includes(query) ||
        activity.action.toLowerCase().includes(query) ||
        activity.entityType.toLowerCase().includes(query) ||
        activity.entityId.toLowerCase().includes(query)
      );
    }

    return filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }, [activities, filters, searchQuery, filterActivities]);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getActionTranslation = (action) => {
    switch (action) {
      case 'view': return t.view;
      case 'add': return t.add;
      case 'edit': return t.edit;
      case 'renew': return t.renew;
      default: return action;
    }
  };

  const getEntityTypeTranslation = (entityType) => {
    switch (entityType) {
      case 'Employee': return t.employee;
      case 'Company': return t.company;
      case 'Vehicle': return t.vehicle;
      default: return entityType;
    }
  };

  return (
    <div className="activity-logs-page">
      <PageHeader
        title={t.title}
        description={t.description}
        icon={Activity}
      />

      {/* Filters */}
      <div className="filters-section">
        <div className="search-bar">
          <Search size={18} />
          <input
            type="text"
            placeholder={t.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-controls">
          <select
            value={filters.userName}
            onChange={(e) => handleFilterChange('userName', e.target.value)}
            className="filter-select"
          >
            <option value="">{t.filterByUser}</option>
            {/* Add unique users from activities */}
            {[...new Set(activities.map(a => a.userName))].map(user => (
              <option key={user} value={user}>{user}</option>
            ))}
          </select>

          <select
            value={filters.action}
            onChange={(e) => handleFilterChange('action', e.target.value)}
            className="filter-select"
          >
            <option value="">{t.filterByAction}</option>
            <option value="view">{t.view}</option>
            <option value="add">{t.add}</option>
            <option value="edit">{t.edit}</option>
            <option value="renew">{t.renew}</option>
          </select>

          <select
            value={filters.entityType}
            onChange={(e) => handleFilterChange('entityType', e.target.value)}
            className="filter-select"
          >
            <option value="">{t.filterByEntity}</option>
            <option value="Employee">{t.employee}</option>
            <option value="Company">{t.company}</option>
            <option value="Vehicle">{t.vehicle}</option>
          </select>

          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
            className="filter-input"
            placeholder={t.dateFrom}
          />

          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => handleFilterChange('dateTo', e.target.value)}
            className="filter-input"
            placeholder={t.dateTo}
          />
        </div>
      </div>

      {/* Activities Table */}
      <div className="activities-table-container">
        {filteredActivities.length > 0 ? (
          <table className="activities-table">
            <thead>
              <tr>
                <th>{t.user}</th>
                <th>{t.action}</th>
                <th>{t.entityType}</th>
                <th>{t.entityId}</th>
                <th>{t.timestamp}</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.map((activity) => (
                <tr key={activity.activityId}>
                  <td>{activity.userName}</td>
                  <td>
                    <span className={`action-badge ${activity.action}`}>
                      {getActionTranslation(activity.action)}
                    </span>
                  </td>
                  <td>{getEntityTypeTranslation(activity.entityType)}</td>
                  <td>{activity.entityId}</td>
                  <td>{formatDateToDisplay(activity.timestamp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <Activity size={48} />
            <p className="empty-title">{t.noActivities}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityLogs;