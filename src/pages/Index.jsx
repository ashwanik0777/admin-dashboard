import React, { useState } from 'react';
import LoginPage from '../components/LoginPage';
import AdminDashboard from '../components/AdminDashboard';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  const handleLogin = (role) => {
    setUserRole(role || 'admin');
    setIsLoggedIn(true);
    localStorage.setItem('isAdmin', 'true');
    console.log(`Admin logged in with role: ${role}`);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('');
    console.log('Admin logged out');
  };

  if (!isLoggedIn && !localStorage.getItem('isAdmin')) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <AdminDashboard userRole={userRole || 'superadmin'} onLogout={handleLogout} />;
};

export default Index;