// pages/Dashboard.js
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, Building, Car
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import DashboardCard from '../components/DashboardCard';
import { useSettings } from '../hooks/useSettings';
import { useDocuments } from '../hooks/useDocuments';
import { useCompanyDocuments } from '../hooks/useCompanyDocuments';
import { useVehicleDocuments } from '../hooks/useVehicleDocuments';
import { getStatusColor } from '../utils/statusUtils';
import '../styles/Dashboard.css';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const Dashboard = () => {
  const navigate = useNavigate();
  const { language } = useSettings();

  const { documents } = useDocuments();
  const { documents: companyDocuments } = useCompanyDocuments();
  const { documents: vehicleDocuments } = useVehicleDocuments();

  const translations = {
    en: {
      title: 'Navigation Dashboard',
      description: 'Access different document management modules',
      documentStatus: 'Document Status',
      employeeStatus: 'Employee Documents Status',
      companyStatus: 'Company Documents Status',
      vehicleStatus: 'Vehicle Documents Status'
    },
    ar: {
      title: 'لوحة التنقل',
      description: 'الوصول إلى وحدات إدارة المستندات المختلفة',
      documentStatus: 'حالة المستند',
      employeeStatus: 'حالة مستندات الموظفين',
      companyStatus: 'حالة المستندات الشركات',
      vehicleStatus: 'حالة مستندات المركبات'
    }
  };

  const t = translations[language] || translations.en;

  const getStatusChartData = (items) => {
    const grouped = items.reduce((acc, doc) => {
      if (!doc.status) return acc;
      acc[doc.status] = (acc[doc.status] || 0) + 1;
      return acc;
    }, {});

    return [
      { name: 'Valid', value: grouped.Valid || 0, color: getStatusColor('Valid') },
      { name: 'Expiring Soon', value: grouped['Expiring Soon'] || 0, color: getStatusColor('Expiring Soon') },
      { name: 'Expired', value: grouped.Expired || 0, color: getStatusColor('Expired') }
    ].filter(entry => entry.value > 0);
  };

  const employeeStatusChartData = useMemo(() => getStatusChartData(documents), [documents]);
  const companyStatusChartData = useMemo(() => getStatusChartData(companyDocuments), [companyDocuments]);
  const vehicleStatusChartData = useMemo(() => getStatusChartData(vehicleDocuments), [vehicleDocuments]);

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

      {/* <div className="charts-grid">
        <div className="chart-card">
          <h3>{t.employeeStatus}</h3>
          <div className="chart-container">
            {employeeStatusChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={employeeStatusChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {employeeStatusChartData.map((entry, index) => (
                      <Cell key={`emp-cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="no-data">No data available</p>
            )}
          </div>
        </div>

        <div className="chart-card">
          <h3>{t.companyStatus}</h3>
          <div className="chart-container">
            {companyStatusChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={companyStatusChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {companyStatusChartData.map((entry, index) => (
                      <Cell key={`company-cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="no-data">No data available</p>
            )}
          </div>
        </div>

        <div className="chart-card">
          <h3>{t.vehicleStatus}</h3>
          <div className="chart-container">
            {vehicleStatusChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={vehicleStatusChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {vehicleStatusChartData.map((entry, index) => (
                      <Cell key={`vehicle-cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="no-data">No data available</p>
            )}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
