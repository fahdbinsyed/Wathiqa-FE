// pages/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, Building, Car
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import DashboardCard from '../components/DashboardCard';
import { useSettings } from '../hooks/useSettings';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { language } = useSettings();

  const translations = {
    en: {
      title: 'Navigation Dashboard',
      description: 'Access different document management modules'
    },
    ar: {
      title: 'لوحة التنقل',
      description: 'الوصول إلى وحدات إدارة المستندات المختلفة'
    }
  };

  const t = translations[language] || translations.en;

  return (
    <div className="dashboard-page">
      <PageHeader
        title={t.title}
        description={t.description}
        icon={Users}
      />

      {/* Navigation Cards */}
      <div className="navigation-grid">
        <DashboardCard
          title="Employee Documents"
          icon={Users}
          color="primary"
          onClick={() => navigate('/employees')}
        />
        <DashboardCard
          title="Company Documents"
          icon={Building}
          color="primary"
          onClick={() => navigate('/company-documents')}
        />
        <DashboardCard
          title="Vehicle Documents"
          icon={Car}
          color="primary"
          onClick={() => navigate('/vehicle-documents')}
        />
      </div>
    </div>
  );
};

export default Dashboard;
