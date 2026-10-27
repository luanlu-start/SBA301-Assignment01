import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminLayout from './components/Layout/AdminLayout';
import DashboardPage from './pages/DashboardPage';
import CategoryManagement from './pages/CategoryManagement';
import NewsManagement from './pages/NewsManagement';
import UserManagement from './pages/UserManagement';
import SettingsPage from './pages/SettingsPage';
import { getCurrentUser } from './services/dataService';

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
