import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LuanLHCE191099_LoginPage';
import AdminLayout from './components/Layout/LuanLHCE191099_AdminLayout';
import DashboardPage from './pages/LuanLHCE191099_DashboardPage';
import CategoryManagement from './pages/LuanLHCE191099_CategoryManagement';
import NewsManagement from './pages/LuanLHCE191099_NewsManagement';
import UserManagement from './pages/LuanLHCE191099_UserManagement';
import SettingsPage from './pages/LuanLHCE191099_SettingsPage';
import { getCurrentUser } from './services/LuanLHCE191099_dataService';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(getCurrentUser()));

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          !isAuthenticated ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/" />
        } />
        
        <Route path="/" element={
          isAuthenticated ? <AdminLayout onLogout={handleLogout} /> : <Navigate to="/login" />
        }>
          <Route index element={<DashboardPage />} />
          <Route path="category" element={<CategoryManagement />} />
          <Route path="news" element={<NewsManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
