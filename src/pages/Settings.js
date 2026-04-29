// pages/Settings.js
import React, { useState } from 'react';
import { Settings as SettingsIcon, Save } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useSettings } from '../hooks/useSettings';
import '../styles/Settings.css';

const Settings = () => {
  const { reminderDays, setReminderDays, isDarkMode, toggleDarkMode, language, toggleLanguage, companyName, setCompanyName, notificationsEnabled, setNotificationsEnabled } = useSettings();
  const [localReminderDays, setLocalReminderDays] = useState(reminderDays);
  const [localCompanyName, setLocalCompanyName] = useState(companyName);
  const [localNotificationsEnabled, setLocalNotificationsEnabled] = useState(notificationsEnabled);
  const [saved, setSaved] = useState(false);

  const translations = {
    en: {
      title: 'Settings',
      description: 'Manage application preferences',
      general: 'General',
      appearance: 'Appearance',
      notifications: 'Notifications',
      companyName: 'Company Name',
      companyNameDesc: 'Enter your company name',
      reminderDays: 'Document Expiry Reminder',
      reminderDaysDesc: 'Number of days before expiry to show alert',
      days: 'days',
      // darkMode: 'Dark Mode',
      darkModeDesc: 'Enable dark theme for better visibility at night',
      language: 'Language',
      languageDesc: 'Choose your preferred language',
      english: 'English',
      arabic: 'العربية',
      documentReminder: 'Document Reminders',
      documentReminderDesc: 'Get notified when documents are about to expire',
      notificationsEnabled: 'Enable Notifications',
      notificationsEnabledDesc: 'Toggle notifications for expiring documents',
      saveSettings: 'Save Settings',
      settingsSaved: 'Settings saved successfully!'
    },
    ar: {
      title: 'الإعدادات',
      description: 'إدارة تفضيلات التطبيق',
      general: 'عام',
      appearance: 'المظهر',
      notifications: 'الإشعارات',
      companyName: 'اسم الشركة',
      companyNameDesc: 'أدخل اسم شركتك',
      reminderDays: 'تنبيه انتهاء صلاحية المستند',
      reminderDaysDesc: 'عدد الأيام قبل انتهاء الصلاحية لإظهار التنبيه',
      days: 'يوماً',
      // darkMode: 'الوضع الليلي',
      darkModeDesc: 'تفعيل المظهر الداكن لرؤية أفضل في الليل',
      language: 'اللغة',
      languageDesc: 'اختر لغتك المفضلة',
      english: 'English',
      arabic: 'العربية',
      documentReminder: 'تذكيرات المستندات',
      documentReminderDesc: 'احصل على إشعار عند اقتراب انتهاء صلاحية المستندات',
      notificationsEnabled: 'تفعيل الإشعارات',
      notificationsEnabledDesc: 'تبديل الإشعارات للمستندات التي على وشك الانتهاء',
      saveSettings: 'حفظ الإعدادات',
      settingsSaved: 'تم حفظ الإعدادات بنجاح!'
    }
  };

  const t = translations[language] || translations.en;

  const handleSaveSettings = () => {
    setReminderDays(localReminderDays);
    setCompanyName(localCompanyName);
    setNotificationsEnabled(localNotificationsEnabled);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="settings-page">
      <PageHeader
        title={t.title}
        description={t.description}
        icon={SettingsIcon}
      />

      <div className="settings-container">
        {saved && <div className="save-notification">{t.settingsSaved}</div>}

        {/* General Settings */}
        <div className="settings-section">
          <h2>{t.general}</h2>

          <div className="setting-item">
            <div className="setting-info">
              <label>{t.companyName}</label>
              <p>{t.companyNameDesc}</p>
            </div>
            <input
              type="text"
              value={localCompanyName}
              onChange={(e) => setLocalCompanyName(e.target.value)}
              className="setting-input"
            />
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <label>{t.reminderDays}</label>
              <p>{t.reminderDaysDesc}</p>
            </div>
            <div className="setting-select-group">
              <select
                value={localReminderDays}
                onChange={(e) => setLocalReminderDays(parseInt(e.target.value))}
                className="setting-select"
              >
                <option value="30">30 {t.days}</option>
                <option value="45">45 {t.days}</option>
                <option value="60">60 {t.days}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="settings-section">
          <h2>{t.appearance}</h2>

          {/* <div className="setting-item">
            <div className="setting-info">
              <label>{t.darkMode}</label>
              <p>{t.darkModeDesc}</p>
            </div>
            <button
              className={`toggle-btn ${isDarkMode ? 'active' : ''}`}
              onClick={toggleDarkMode}
            >
              <span className="toggle-thumb" />
            </button>
          </div> */}

          <div className="setting-item">
            <div className="setting-info">
              <label>{t.language}</label>
              <p>{t.languageDesc}</p>
            </div>
            <button
              className="language-btn"
              onClick={toggleLanguage}
            >
              {language === 'en' ? 'عربي' : 'English'}
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="settings-section">
          <h2>{t.notifications}</h2>

          <div className="setting-item">
            <div className="setting-info">
              <label>{t.notificationsEnabled}</label>
              <p>{t.notificationsEnabledDesc}</p>
            </div>
            <button
              className={`toggle-btn ${localNotificationsEnabled ? 'active' : ''}`}
              onClick={() => setLocalNotificationsEnabled(!localNotificationsEnabled)}
            >
              <span className="toggle-thumb" />
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="settings-actions">
          <button
            className="btn btn-primary save-btn"
            onClick={handleSaveSettings}
          >
            <Save size={20} />
            {t.saveSettings}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
