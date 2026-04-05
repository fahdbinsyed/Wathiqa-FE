// components/Sidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Users,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useSettings } from '../hooks/useSettings';
import '../styles/Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  const { language } = useSettings();
  const location = useLocation();

  const translations = {
    en: {
      dashboard: 'Dashboard',
      employees: 'Employees',
      documents: 'Documents',
      reports: 'Reports',
      settings: 'Settings',
      logout: 'Logout',
      menu: 'Menu'
    },
    ar: {
      dashboard: 'لوحة التحكم',
      employees: 'الموظفون',
      documents: 'المستندات',
      reports: 'التقارير',
      settings: 'الإعدادات',
      logout: 'تسجيل الخروج',
      menu: 'القائمة'
    }
  };

  const t = translations[language] || translations.en;

  const menuItems = [
    { icon: Home, label: t.dashboard, path: '/dashboard', key: 'dashboard' },
    { icon: Users, label: t.employees, path: '/employees', key: 'employees' },
    { icon: FileText, label: t.documents, path: '/documents', key: 'documents' },
    { icon: BarChart3, label: t.reports, path: '/reports', key: 'reports' },
    { icon: Settings, label: t.settings, path: '/settings', key: 'settings' }
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={onClose} />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="logo-icon">W</div>
            <span className="logo-text">Wathiqa</span>
          </div>
          <button className="sidebar-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.key}
              to={item.path}
              className={`sidebar-nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => window.innerWidth < 768 && onClose()}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-logout-btn" onClick={handleLogout}>
            <LogOut size={20} />
            <span>{t.logout}</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
