// components/Navbar.js
import React, { useState, useEffect, useRef } from 'react';
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
  const { isDarkMode, toggleDarkMode, language, toggleLanguage, notificationsEnabled } = useSettings();
  const { notifications, unreadNotifications, markNotificationRead, markAllNotificationsRead } = useDocuments();

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const unreadCount = unreadNotifications.length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target) &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setIsNotificationsOpen(false);
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const translations = {
    en: {
      search: 'Search...',
      profile: 'Profile',
      settings: 'Settings',
      logout: 'Logout',
      notifications: 'Notifications',
      noNotifications: 'No new notifications',
      expiringSoon: 'Document expiring soon',
      markAllRead: 'Mark all as read',
      notificationsDisabled: 'Notifications are disabled. Enable them in settings.'
    },
    ar: {
      search: 'بحث...',
      profile: 'الملف الشخصي',
      settings: 'الإعدادات',
      logout: 'تسجيل الخروج',
      notifications: 'الإشعارات',
      noNotifications: 'لا توجد إشعارات جديدة',
      expiringSoon: 'مستند ينتهي قريباً',
      markAllRead: 'وضع الجميع كمقروءة',
      notificationsDisabled: 'الإشعارات معطلة. قم بتفعيلها في الإعدادات.'
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

        {/* <div className="navbar-search">
        <Search size={18} className="navbar-search-icon" />
        <input
            type="text"
            placeholder={t.search}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="navbar-search-input"
        />
        </div> */}
      </div>

      <div className="navbar-right">
        {/* Theme Toggle */}
        {/* <button
          className="navbar-icon-btn"
          onClick={toggleDarkMode}
          title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button> */}

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
        <div className="navbar-notification-container" ref={notificationRef}>
          <button
            className="navbar-icon-btn"
            onClick={() => {
              setIsNotificationsOpen((prev) => !prev);
              setIsProfileOpen(false);
            }}
            title={t.notifications}
          >
            <Bell size={20} />
            {notificationsEnabled && unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </button>

          {isNotificationsOpen && (
            <div className="navbar-notification-dropdown">
              <div className="notification-header">
                <h3>{t.notifications}</h3>
                {notificationsEnabled && unreadCount > 0 && (
                  <button
                    className="mark-read-btn"
                    onClick={() => markAllNotificationsRead()}
                  >
                    {t.markAllRead}
                  </button>
                )}
              </div>
              <div className="notification-list">
                {!notificationsEnabled ? (
                  <div className="notification-empty">
                    <p>{t.notificationsDisabled}</p>
                  </div>
                ) : notifications.length > 0 ? (
                  notifications.slice(0, 5).map((doc) => (
                    <div
                      key={doc.documentId}
                      className={`notification-item ${doc.read ? 'read' : ''}`}
                      onClick={() => markNotificationRead(doc.documentId)}
                    >
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
        <div className="navbar-profile-container" ref={profileRef}>
          <button
            className="navbar-profile-btn"
            onClick={() => {
              setIsProfileOpen((prev) => !prev);
              setIsNotificationsOpen(false);
            }}
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
