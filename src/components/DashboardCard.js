// components/DashboardCard.js
import React from 'react';
import '../styles/DashboardCard.css';

const DashboardCard = ({ title, value, description, icon: Icon, color = 'primary', trend }) => {
  return (
    <div className={`dashboard-card dashboard-card-${color}`}>
      <div className="card-header">
        <div className="card-icon">
          <Icon size={24} />
        </div>
        {trend && <div className={`card-trend ${trend.direction}`}>{trend.value}</div>}
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-value">{value}</p>
        {description && <p className="card-description">{description}</p>}
      </div>
    </div>
  );
};

export default DashboardCard;
