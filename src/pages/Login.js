// pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LogIn, AlertCircle } from 'lucide-react';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (login(email, password)) {
        navigate('/dashboard');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    login('admin@company.com', 'demo123');
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login-bg-circle circle-1" />
        <div className="login-bg-circle circle-2" />
        <div className="login-bg-circle circle-3" />
      </div>

      <div className="login-card">
        <div className="login-logo">
          <div className="logo-icon">W</div>
          <div>
            <h1>Wathiqa</h1>
            <p>Employee Desk Management System</p>
          </div>
        </div>

        <div className="login-content">
          <h2>Welcome Back</h2>
          <p>Sign in to your account to continue</p>

          {error && (
            <div className="alert alert-error">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@company.com"
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
            </div>

            <button type="submit" className="login-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="login-divider">or</div>

          <div className="demo-login">
            <button type="button" className="demo-btn" onClick={handleDemoLogin}>
              Demo Login
            </button>
</div>

</div>
        
      </div>

      {/* <div className="login-features">
        <div className="feature">
          <div className="feature-icon">📋</div>
          <h3>Document Management</h3>
          <p>Manage all employee documents in one place</p>
        </div>
        <div className="feature">
          <div className="feature-icon">⏰</div>
          <h3>Expiry Tracking</h3>
          <p>Never miss important document deadlines</p>
        </div>
        <div className="feature">
          <div className="feature-icon">📊</div>
          <h3>Analytics</h3>
          <p>Get insights into compliance status</p>
        </div>
      </div> */}
    </div>
  );
};

export default Login;
