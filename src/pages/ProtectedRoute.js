import React from 'react';
import { useUserContext } from '../context/user_context';
import { Navigate } from 'react-router-dom';
import Loading from '../components/Loading';
const ProtectedRoute = ({ children }) => {
  const { user, userLoading } = useUserContext();

  // if (userLoading) return <Loading />;

  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
