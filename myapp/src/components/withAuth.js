import React from 'react';
import { Navigate } from 'react-router-dom';

export const withAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const isAuthenticated = true;

    if (!isAuthenticated) {
      return <Navigate to="/signin" replace />;
    }

    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};
