// pages/NotFound.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import '../styles/NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-icon">404</div>
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-description">
          Sorry! The page you're looking for doesn't exist.
        </p>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/dashboard')}
        >
          <Home size={20} />
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default NotFound;
