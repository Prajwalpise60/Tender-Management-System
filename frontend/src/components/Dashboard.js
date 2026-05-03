// src/components/Dashboard.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../common.css'; // ✅ External CSS

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-overlay"></div>

      <div className="scrolling-banner">
        <p className="scroll-text">
          🚀 Welcome to the Tender Management System — Secure, Fast & Reliable!
        </p>
      </div>

      <div className="dashboard-box">
        <h1 className="dashboard-title">Tender Management System</h1>
        <p className="dashboard-subtitle">Choose how you want to continue</p>
        <div className="dashboard-actions">
          <button className="btn login-btn" onClick={() => navigate('/login')}>
            Login
          </button>
          <button className="btn register-btn" onClick={() => navigate('/register')}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
