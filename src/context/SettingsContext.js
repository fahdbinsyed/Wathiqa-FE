// SettingsContext.js
import React, { createContext, useState, useEffect } from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [reminderDays, setReminderDays] = useState(() => {
    const saved = localStorage.getItem('reminderDays');
    return saved ? parseInt(saved) : 60;
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved || 'en';
  });

  const [companyName, setCompanyName] = useState(() => {
    const saved = localStorage.getItem('companyName');
    return saved || 'My Company';
  });

  const [companyLogo, setCompanyLogo] = useState(() => {
    const saved = localStorage.getItem('companyLogo');
    return saved || null;
  });

  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    const saved = localStorage.getItem('notificationsEnabled');
    return saved ? JSON.parse(saved) : true;
  });

  const [selectedBranch, setSelectedBranch] = useState(() => {
    const saved = localStorage.getItem('selectedBranch');
    return saved || 'All';
  });

  // Save to localStorage whenever settings change
  useEffect(() => {
    localStorage.setItem('reminderDays', reminderDays);
  }, [reminderDays]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('companyName', companyName);
  }, [companyName]);

  useEffect(() => {
    if (companyLogo) {
      localStorage.setItem('companyLogo', companyLogo);
    }
  }, [companyLogo]);

  useEffect(() => {
    localStorage.setItem('notificationsEnabled', JSON.stringify(notificationsEnabled));
  }, [notificationsEnabled]);

  useEffect(() => {
    localStorage.setItem('selectedBranch', selectedBranch);
  }, [selectedBranch]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const value = {
    reminderDays,
    setReminderDays,
    isDarkMode,
    toggleDarkMode,
    language,
    toggleLanguage,
    companyName,
    setCompanyName,
    companyLogo,
    setCompanyLogo,
    notificationsEnabled,
    setNotificationsEnabled,
    selectedBranch,
    setSelectedBranch
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
