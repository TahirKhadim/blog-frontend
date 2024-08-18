// components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element }) => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  
  

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
