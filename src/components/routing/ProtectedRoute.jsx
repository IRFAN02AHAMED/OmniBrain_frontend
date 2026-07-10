import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppStore } from '../../store/store';

/**
 * Guards any route that requires the user to be logged in.
 * Redirects to /signin if not authenticated.
 */
const ProtectedRoute = () => {
  const isLoggedIn = useAppStore((s) => s.isLoggedIn);
  const hasToken = !!localStorage.getItem('auth_token');

  if (!isLoggedIn && !hasToken) {
    return <Navigate to="/signin" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
