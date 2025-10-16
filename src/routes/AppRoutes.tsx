import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import { ROUTES } from '../utils/constants';

// Layouts
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';

// Auth Pages
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup';
import ForgotPassword from '../pages/Auth/ForgotPassword';

// Main Pages
import Dashboard from '../pages/Dashboard/Index';
import ReportsPage from '../pages/Reports/ReportsPage';
import AnalyticsPage from '../pages/Analytics/AnalyticsPage';
import ProfileSettings from '../pages/Profile/ProfileSettings';

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const authenticated = isAuthenticated();
  
  if (!authenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  
  return <>{children}</>;
};

// Public Route Component (redirect to dashboard if already authenticated)
interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const authenticated = isAuthenticated();
  
  if (authenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes (Auth) */}
      <Route
        path={ROUTES.LOGIN}
        element={
          <PublicRoute>
            <AuthLayout>
              <Login />
            </AuthLayout>
          </PublicRoute>
        }
      />
      <Route
        path={ROUTES.SIGNUP}
        element={
          <PublicRoute>
            <AuthLayout>
              <Signup />
            </AuthLayout>
          </PublicRoute>
        }
      />
      <Route
        path={ROUTES.FORGOT_PASSWORD}
        element={
          <PublicRoute>
            <AuthLayout>
              <ForgotPassword />
            </AuthLayout>
          </PublicRoute>
        }
      />

      {/* Protected Routes (Main App) */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        {/* Dashboard */}
        <Route index element={<Navigate to={ROUTES.DASHBOARD} replace />} />
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        
        {/* Reports */}
        <Route path={ROUTES.REPORTS} element={<ReportsPage />} />
        <Route path="/reports/performance" element={<ReportsPage />} />
        
        {/* Analytics */}
        <Route path={ROUTES.ANALYTICS} element={<AnalyticsPage />} />
        <Route path="/analytics/detailed" element={<AnalyticsPage />} />
        
        {/* Profile */}
        <Route path={ROUTES.PROFILE} element={<ProfileSettings />} />
      </Route>

      {/* Catch all route - redirect to dashboard if authenticated, login if not */}
      <Route
        path="*"
        element={
          isAuthenticated() ? (
            <Navigate to={ROUTES.DASHBOARD} replace />
          ) : (
            <Navigate to={ROUTES.LOGIN} replace />
          )
        }
      />
    </Routes>
  );
};

export default AppRoutes;
