import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Main from '../layout/Main.jsx';
import Login from '../components/Login.jsx';
import { useAuth } from '../context/AuthContext.jsx'; 

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? element : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={<ProtectedRoute element={<Main />} />}
      />
    </Routes>
  );
};

export default AppRoutes;
