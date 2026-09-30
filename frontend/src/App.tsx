import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Sidebar from './Sidebar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import StudiesPage from './pages/StudiesPage';
import StudyDetailPage from './pages/StudyDetailPage';
import SitesPage from './pages/SitesPage';
import ParticipantsPage from './pages/ParticipantsPage';
import SafetyPage from './pages/SafetyPage';
import CompliancePage from './pages/CompliancePage';
import DataQualityPage from './pages/DataQualityPage';
import AlertsPage from './pages/AlertsPage';
import AuditPage from './pages/AuditPage';
import FhirPage from './pages/FhirPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <div className="page-body">{children}</div>
      </div>
    </div>
  );
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Root & Landing Page always show Landing Page first */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/landing" element={<LandingPage />} />

      {/* Auth */}
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} />

      {/* Dashboard & App Modules */}
      <Route path="/dashboard" element={<ProtectedLayout><DashboardPage /></ProtectedLayout>} />
      <Route path="/studies" element={<ProtectedLayout><StudiesPage /></ProtectedLayout>} />
      <Route path="/studies/:id" element={<ProtectedLayout><StudyDetailPage /></ProtectedLayout>} />
      <Route path="/sites" element={<ProtectedLayout><SitesPage /></ProtectedLayout>} />
      <Route path="/participants" element={<ProtectedLayout><ParticipantsPage /></ProtectedLayout>} />
      <Route path="/safety" element={<ProtectedLayout><SafetyPage /></ProtectedLayout>} />
      <Route path="/compliance" element={<ProtectedLayout><CompliancePage /></ProtectedLayout>} />
      <Route path="/data-quality" element={<ProtectedLayout><DataQualityPage /></ProtectedLayout>} />
      <Route path="/alerts" element={<ProtectedLayout><AlertsPage /></ProtectedLayout>} />
      <Route path="/audit" element={<ProtectedLayout><AuditPage /></ProtectedLayout>} />
      <Route path="/fhir" element={<ProtectedLayout><FhirPage /></ProtectedLayout>} />
      <Route path="/reports" element={<ProtectedLayout><ReportsPage /></ProtectedLayout>} />
      <Route path="/settings" element={<ProtectedLayout><SettingsPage /></ProtectedLayout>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
