import React, { useState, useEffect } from "react";
import { ToastProvider } from "../src/components/sonner";
import { TooltipProvider } from "./components/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import UnderDevLogin from "./components/underdevelopmentLogin";
import LoginPage from "./components/LoginPage";
import AdminDashboard from "./components/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function RequireAuth({ isLoggedIn, children }) {
  const location = useLocation();
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [showDevLogin, setShowDevLogin] = useState(true);

  const handleDevLogin = () => {
    setShowDevLogin(false);
  };

  // Check for regular login (only after dev login is passed)
  useEffect(() => {
    if (!showDevLogin) {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      if (token && role) {
        setIsLoggedIn(true);
        setUserRole(role);
        toast.success(`Welcome back, ${role}!`);
      }
    }
  }, [showDevLogin]);

  const handleLogin = (role) => {
    localStorage.setItem("role", role);
    setUserRole(role);
    setIsLoggedIn(true);
    toast.success(`Logged in as ${role}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setUserRole("");
    toast.success("Logged out successfully");
  };

  // Show under-development login first on every load
  if (showDevLogin) {
    return <UnderDevLogin onLogin={handleDevLogin} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route
                path="/login"
                element={
                  isLoggedIn ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <LoginPage onLogin={handleLogin} />
                  )
                }
              />
              <Route
                path="/dashboard"
                element={
                  <RequireAuth isLoggedIn={isLoggedIn}>
                    <AdminDashboard userRole={userRole} onLogout={handleLogout} />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;