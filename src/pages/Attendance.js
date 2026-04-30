// pages/Attendance.js
import React, { useState, useMemo } from 'react';
import { Clock, AlertCircle, CheckCircle, Calendar, Download, Plus, Search, X } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import DashboardCard from '../components/DashboardCard';
import { useEmployees } from '../hooks/useEmployees';
import { useSettings } from '../hooks/useSettings';
import { formatDateToDisplay } from '../utils/dateUtils';
import '../styles/Attendance.css';

const Attendance = () => {
  const { employees } = useEmployees();
  const { language, selectedBranch } = useSettings();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRecord, setNewRecord] = useState({
    employeeId: '',
    date: '',
    checkIn: '',
    checkOut: '',
    status: 'present'
  });

  const translations = {
    en: {
      title: 'Attendance & Leave',
      description: 'Track and manage employee attendance and leaves',
      present: 'Present',
      absent: 'Absent',
      onLeave: 'On Leave',
      late: 'Late',
      month: 'Month',
      year: 'Year',
      employee: 'Employee',
      date: 'Date',
      checkIn: 'Check In',
      checkOut: 'Check Out',
      status: 'Status',
      totalPresent: 'Total Present',
      totalAbsent: 'Total Absent',
      totalLate: 'Total Late',
      exportAttendance: 'Export Attendance',
      addRecord: 'Add Record',
      searchPlaceholder: 'Search by name or Iqama ID',
      addAttendanceRecord: 'Add Attendance Record',
      selectEmployee: 'Select Employee',
      save: 'Save',
      cancel: 'Cancel',
    },
    ar: {
      title: 'الحضور والانصراف',
      description: 'تتبع وإدارة حضور وانصراف الموظفين والإجازات',
      present: 'حاضر',
      absent: 'غائب',
      onLeave: 'في إجازة',
      late: 'متأخر',
      month: 'الشهر',
      year: 'السنة',
      employee: 'الموظف',
      date: 'التاريخ',
      checkIn: 'وقت الدخول',
      checkOut: 'وقت الخروج',
      status: 'الحالة',
      totalPresent: 'إجمالي الحضور',
      totalAbsent: 'إجمالي الغياب',
      totalLate: 'إجمالي التأخر',
      exportAttendance: 'تصدير الحضور',
      addRecord: 'إضافة سجل',
      searchPlaceholder: 'البحث بالاسم أو رقم الإقامة',
      addAttendanceRecord: 'إضافة سجل حضور',
      selectEmployee: 'اختر موظف',
      save: 'حفظ',
      cancel: 'إلغاء',
    }
  };

  const t = translations[language] || translations.en;

  const generateAttendanceData = () => {
    const data = [];
    const statuses = ['present', 'absent', 'late', 'onLeave'];

    employees.forEach(employee => {
      if (selectedBranch && selectedBranch !== 'All' && employee.branch !== selectedBranch) return;

      const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(selectedYear, selectedMonth, day);
        if (date.getDay() === 5) continue;

        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        data.push({
          id: `${employee.employeeId}-${day}`,
          employeeId: employee.employeeId,
          employeeName: employee.fullName,
          date: new Date(selectedYear, selectedMonth, day),
          status: randomStatus,
          checkIn: randomStatus === 'present' || randomStatus === 'late' ? '09:00' : null,
          checkOut: randomStatus === 'present' || randomStatus === 'late' ? '17:00' : null
        });
      }
    });

    return data;
  };

  const attendanceData = useMemo(
    () => generateAttendanceData(),
    [employees, selectedMonth, selectedYear, selectedBranch]
  );

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return attendanceData;
    const q = searchQuery.toLowerCase();
    return attendanceData.filter(r =>
      r.employeeName.toLowerCase().includes(q) ||
      r.employeeId.toLowerCase().includes(q)
    );
  }, [attendanceData, searchQuery]);

  const stats = useMemo(() => ({
    present: attendanceData.filter(a => a.status === 'present').length,
    absent:  attendanceData.filter(a => a.status === 'absent').length,
    late:    attendanceData.filter(a => a.status === 'late').length,
    onLeave: attendanceData.filter(a => a.status === 'onLeave').length,
  }), [attendanceData]);

  const months = language === 'ar'
    ? ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر']
    : ['January','February','March','April','May','June','July','August','September','October','November','December'];

  const getStatusBadge = (status) => {
    const map = {
      present: { label: t.present,  className: 'status-present' },
      absent:  { label: t.absent,   className: 'status-absent'  },
      late:    { label: t.late,     className: 'status-late'    },
      onLeave: { label: t.onLeave,  className: 'status-leave'   },
    };
    const { label, className } = map[status] || map.present;
    return <span className={`status-badge ${className}`}>{label}</span>;
  };

  const handleExport = () => {
    const headers = ['Employee', 'Date', 'Check In', 'Check Out', 'Status'];
    const rows = filteredData.slice(0, 50).map(r => [
      r.employeeName,
      formatDateToDisplay(r.date),
      r.checkIn  || '-',
      r.checkOut || '-',
      r.status
    ]);
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_${months[selectedMonth]}_${selectedYear}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveRecord = () => {
    // In a real app this would call addAttendanceRecord context method
    setShowAddModal(false);
    setNewRecord({ employeeId: '', date: '', checkIn: '', checkOut: '', status: 'present' });
  };

  return (
    <div className="attendance-page">
      <PageHeader title={t.title} description={t.description} icon={Clock}/>

      {/* Stats */}
      {/* <div className="attendance-stats-grid">
        <DashboardCard title={t.totalPresent} value={stats.present} icon={CheckCircle} color="success"  />
        <DashboardCard title={t.totalAbsent}  value={stats.absent}  icon={AlertCircle} color="danger"   />
        <DashboardCard title={t.totalLate}    value={stats.late}    icon={Clock}       color="warning"  />
        <DashboardCard title={t.onLeave}      value={stats.onLeave} icon={Calendar}    color="primary"  />
      </div> */}

      {/* Toolbar */}
      <div className="attendance-toolbar">
        <div className="attendance-toolbar-left">
          {/* Search */}
          <div className="attendance-search-wrapper">
            <Search size={16} className="attendance-search-icon" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="attendance-search-input"
            />
          </div>

          {/* Month filter */}
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            className="attendance-filter-select"
          >
            {months.map((month, index) => (
              <option key={index} value={index}>{month}</option>
            ))}
          </select>

          {/* Year filter */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="attendance-filter-select"
          >
            {[2024, 2025, 2026].map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className="attendance-toolbar-right">
          <button className="attendance-btn attendance-btn-outline" onClick={handleExport}>
            <Download size={16} />
            {t.exportAttendance}
          </button>
          <button className="attendance-btn attendance-btn-primary" onClick={() => setShowAddModal(true)}>
            <Plus size={16} />
            {t.addRecord}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="attendance-table-container">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>{t.employee}</th>
              <th>{t.date}</th>
              <th>{t.checkIn}</th>
              <th>{t.checkOut}</th>
              <th>{t.status}</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.slice(0, 50).map((record) => (
              <tr key={record.id}>
                <td><strong>{record.employeeName}</strong></td>
                <td>{formatDateToDisplay(record.date)}</td>
                <td>{record.checkIn  || '-'}</td>
                <td>{record.checkOut || '-'}</td>
                <td>{getStatusBadge(record.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Record Modal */}
      {showAddModal && (
        <div className="attendance-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="attendance-modal" onClick={(e) => e.stopPropagation()}>
            <div className="attendance-modal-header">
              <h3>{t.addAttendanceRecord}</h3>
              <button className="attendance-modal-close" onClick={() => setShowAddModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="attendance-modal-body">
              <div className="attendance-form-group">
                <label>{t.employee}</label>
                <select
                  value={newRecord.employeeId}
                  onChange={(e) => setNewRecord({ ...newRecord, employeeId: e.target.value })}
                  className="attendance-filter-select"
                  style={{ width: '100%' }}
                >
                  <option value="">{t.selectEmployee}</option>
                  {employees.map(emp => (
                    <option key={emp.employeeId} value={emp.employeeId}>{emp.fullName}</option>
                  ))}
                </select>
              </div>
              <div className="attendance-form-group">
                <label>{t.date}</label>
                <input
                  type="date"
                  value={newRecord.date}
                  onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
                  className="attendance-search-input"
                  style={{ width: '100%', paddingLeft: '1rem' }}
                />
              </div>
              <div className="attendance-form-row">
                <div className="attendance-form-group">
                  <label>{t.checkIn}</label>
                  <input
                    type="time"
                    value={newRecord.checkIn}
                    onChange={(e) => setNewRecord({ ...newRecord, checkIn: e.target.value })}
                    className="attendance-search-input"
                    style={{ width: '100%', paddingLeft: '1rem' }}
                  />
                </div>
                <div className="attendance-form-group">
                  <label>{t.checkOut}</label>
                  <input
                    type="time"
                    value={newRecord.checkOut}
                    onChange={(e) => setNewRecord({ ...newRecord, checkOut: e.target.value })}
                    className="attendance-search-input"
                    style={{ width: '100%', paddingLeft: '1rem' }}
                  />
                </div>
              </div>
              <div className="attendance-form-group">
                <label>{t.status}</label>
                <select
                  value={newRecord.status}
                  onChange={(e) => setNewRecord({ ...newRecord, status: e.target.value })}
                  className="attendance-filter-select"
                  style={{ width: '100%' }}
                >
                  <option value="present">{t.present}</option>
                  <option value="absent">{t.absent}</option>
                  <option value="late">{t.late}</option>
                  <option value="onLeave">{t.onLeave}</option>
                </select>
              </div>
            </div>
            <div className="attendance-modal-footer">
              <button className="attendance-btn attendance-btn-outline" onClick={() => setShowAddModal(false)}>
                {t.cancel}
              </button>
              <button className="attendance-btn attendance-btn-primary" onClick={handleSaveRecord}>
                {t.save}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;