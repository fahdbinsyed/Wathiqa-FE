// components/Layout.js
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useSettings } from '../hooks/useSettings';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import '../styles/Layout.css';

const Layout = ({ children, searchQuery, onSearchChange }) => {
  const { isLoggedIn } = useAuth();
  const { isDarkMode, language } = useSettings();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isLoggedIn) {
    return children;
  }

  return (
    <div className={`layout ${isDarkMode ? 'dark-mode' : 'light-mode'} ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="layout-main">
        <Navbar
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
        />
        <main className="layout-content">
          <div className="layout-wrapper">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
