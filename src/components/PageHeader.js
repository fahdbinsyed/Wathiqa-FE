// components/PageHeader.js
import React from 'react';
import { ChevronRight } from 'lucide-react';
import '../styles/PageHeader.css';

const PageHeader = ({ title, description, icon: Icon, actions }) => {
  return (
    <div className="page-header">
      <div className="page-header-content">
        {Icon && (
          <div className="page-header-icon">
            <Icon size={28} />
          </div>
        )}
        <div className="page-header-text">
          <h1 className="page-header-title">{title}</h1>
          {description && <p className="page-header-description">{description}</p>}
        </div>
      </div>
      {actions && <div className="page-header-actions">{actions}</div>}
    </div>
  );
};

export default PageHeader;
