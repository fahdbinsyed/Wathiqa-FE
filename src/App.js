// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SettingsProvider } from './context/SettingsContext';
import { EmployeeProvider } from './context/EmployeeContext';
import { DocumentProvider } from './context/DocumentContext';
import { CompanyDocumentProvider } from './context/CompanyDocumentContext';
import { VehicleProvider } from './context/VehicleContext';
import { VehicleDocumentProvider } from './context/VehicleDocumentContext';
import { ActivityLogProvider } from './context/ActivityLogContext';
import { useAuth } from './hooks/useAuth';
import { useSettings } from './hooks/useSettings';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import EmployeeProfile from './pages/EmployeeProfile';
import Documents from './pages/Documents';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import ActivityLogs from './pages/ActivityLogs';
import NotFound from './pages/NotFound';

// Components
import Layout from './components/Layout';

// Styles
import './styles/global.css';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AppContent = () => {
  const { isLoggedIn } = useAuth();
  const { reminderDays } = useSettings();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <DocumentProvider reminderDays={reminderDays}>
      <CompanyDocumentProvider reminderDays={reminderDays}>
        <VehicleProvider>
          <VehicleDocumentProvider reminderDays={reminderDays}>
            <ActivityLogProvider>
              <Layout searchQuery={searchQuery} onSearchChange={setSearchQuery}>
                <Routes>
                  <Route path="/login" element={<Login />} />
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/employees"
            element={
              <ProtectedRoute>
                <Employees />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/employees/:employeeId"
            element={
              <ProtectedRoute>
                <EmployeeProfile />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/documents"
            element={
              <ProtectedRoute>
                <Documents />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/activity-logs"
            element={
              <ProtectedRoute>
                <ActivityLogs />
              </ProtectedRoute>
            }
          />
          
          <Route path="/" element={<Navigate to={isLoggedIn ? '/dashboard' : '/login'} replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
            </ActivityLogProvider>
          </VehicleDocumentProvider>
        </VehicleProvider>
      </CompanyDocumentProvider>
    </DocumentProvider>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <SettingsProvider>
          <EmployeeProvider>
            <AppContent />
          </EmployeeProvider>
        </SettingsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
