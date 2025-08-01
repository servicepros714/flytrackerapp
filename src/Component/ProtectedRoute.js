import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const jwt = localStorage.getItem('jwt');
  const isAdmin = true;

 if (!jwt) {
  return <Navigate to="/" replace />; // ✅ MUST return
}

  if (adminOnly && !isAdmin) {
    return <Navigate to="/file-tracker" replace />;
  }

  if (!adminOnly && isAdmin) {
    return <Navigate to="/admin-dashboard" replace />;
  }

  return children;
}
