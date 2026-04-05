// components/Navbar.js
import React, { useState } from 'react';
import {
  Bell,
  Search,
  Menu,
  LogOut,
  Sun,
  Moon,
  Globe
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useSettings } from '../hooks/useSettings';
import { useDocuments } from '../hooks/useDocuments';
import '../styles/Navbar.css';

const Navbar = ({ onMenuClick, searchQuery, onSearchChange }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { logout, currentUser } = useAuth();
  const { isDarkMode, toggleDarkMode, language, toggleLanguage } = useSettings();
  const { getExpiringDocuments } = useDocuments();

  const expiringDocs = getExpiringDocuments();

  const translations = {
    en: {
      search: 'Search...',
      profile: 'Profile',
      settings: 'Settings',
      logout: 'Logout',
      notifications: 'Notifications',
      noNotifications: 'No new notifications',
      expiringSoon: 'Document expiring soon'
    },
    ar: {
      search: 'بحث...',
      profile: 'الملف الشخصي',
      settings: 'الإعدادات',
      logout: 'تسجيل الخروج',
      notifications: 'الإشعارات',
      noNotifications: 'لا توجد إشعارات جديدة',
      expiringSoon: 'مستند ينتهي قريباً'
    }
  };

  const t = translations[language] || translations.en;

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button className="navbar-menu-btn" onClick={onMenuClick}>
          <Menu size={24} />
        </button>

        <div className="navbar-search">
        <Search size={18} className="navbar-search-icon" />
        <input
            type="text"
            placeholder={t.search}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="navbar-search-input"
        />
        </div>
      </div>

      <div className="navbar-right">
        {/* Theme Toggle */}
        <button
          className="navbar-icon-btn"
          onClick={toggleDarkMode}
          title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Language Toggle */}
        <button
          className="navbar-icon-btn"
          onClick={toggleLanguage}
          title={language === 'en' ? 'العربية' : 'English'}
        >
          <Globe size={20} />
          <span className="language-badge">{language.toUpperCase()}</span>
        </button>

        {/* Notifications */}
        <div className="navbar-notification-container">
          <button
            className="navbar-icon-btn"
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            title={t.notifications}
          >
            <Bell size={20} />
            {expiringDocs.length > 0 && (
              <span className="notification-badge">{expiringDocs.length}</span>
            )}
          </button>

          {isNotificationsOpen && (
            <div className="navbar-notification-dropdown">
              <div className="notification-header">
                <h3>{t.notifications}</h3>
              </div>
              <div className="notification-list">
                {expiringDocs.length > 0 ? (
                  expiringDocs.slice(0, 5).map((doc) => (
                    <div key={doc.documentId} className="notification-item">
                      <div className="notification-dot" />
                      <div className="notification-content">
                        <p className="notification-title">{doc.documentType}</p>
                        <p className="notification-description">{t.expiringSoon}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="notification-empty">
                    <p>{t.noNotifications}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="navbar-profile-container">
          <button
            className="navbar-profile-btn"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <img
              src={currentUser?.photo || '/data/no-dp.jpg'}
              alt={currentUser?.name}
              className="navbar-profile-pic"
            />
            <span className="navbar-profile-name">{currentUser?.name}</span>
          </button>

          {isProfileOpen && (
            <div className="navbar-profile-dropdown">
              <div className="profile-header">
                <img
                  src={currentUser?.photo || '/data/no-dp.jpg'}
                  alt={currentUser?.name}
                  className="profile-pic"
                />
                <div className="profile-info">
                  <p className="profile-name">{currentUser?.name}</p>
                  <p className="profile-email">{currentUser?.email}</p>
                </div>
              </div>
              <div className="profile-divider" />
              <button
                className="profile-logout-btn"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                {t.logout}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
