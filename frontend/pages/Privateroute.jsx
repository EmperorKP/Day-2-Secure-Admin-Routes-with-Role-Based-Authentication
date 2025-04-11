import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, roleRequired }) {
  const token = localStorage.getItem('token');

  if (!token) return <Navigate to="/" />;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (roleRequired && payload.role !== roleRequired) {
      return <Navigate to="/" />;
    }
  } catch (err) {
    return <Navigate to="/admin" />;
  }

  return children;
}

export default PrivateRoute;
