
import React, { useState } from 'react';
import LoginPage from '../components/LoginPage';
import AdminDashboard from '../components/AdminDashboard';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  const handleLogin = (role) => {
    setUserRole(role);
    setIsLoggedIn(true);
    console.log(`Admin logged in with role: ${role}`);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('');
    console.log('Admin logged out');
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <AdminDashboard userRole={userRole} onLogout={handleLogout} />;
};

export default Index;
