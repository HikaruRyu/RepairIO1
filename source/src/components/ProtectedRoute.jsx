import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, path }) => {
  const checkCookie = () => {
    const cookie = document.cookie.split(';').find(row => row.trim().startsWith('user='));
    if (cookie) {
      const cookieValue = cookie.split('=')[1];
      const user = JSON.parse(decodeURIComponent(cookieValue));
      return user;
    }
    return null;
  };

  const user = checkCookie();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if ((path === '/createConsola' || path === '/editConsola') && !user.rol) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
