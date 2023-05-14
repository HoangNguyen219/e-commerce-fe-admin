import React from 'react';
import { useUserContext } from '../context/user_context';
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({ children }) => {
  const { user } = useUserContext();

  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
