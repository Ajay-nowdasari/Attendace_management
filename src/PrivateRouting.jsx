import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './utils/authUtils';

const PrivateRoute = ({ element: Component }) => {
  return isAuthenticated() ? Component : <Navigate to="/" replace />;
};

export default PrivateRoute;