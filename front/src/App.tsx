import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AnalysisPage from './components/AnalysisPage';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleRegister = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowRegister(false);
  };

  const handleShowRegister = () => {
    setShowRegister(true);
  };

  const handleShowLogin = () => {
    setShowRegister(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {!isAuthenticated ? (
        showRegister ? (
          <RegisterPage onRegister={handleRegister} onBackToLogin={handleShowLogin} />
        ) : (
          <LoginPage onLogin={handleLogin} onShowRegister={handleShowRegister} />
        )
      ) : (
        <AnalysisPage onLogout={handleLogout} />
      )}
    </div>
  );
}