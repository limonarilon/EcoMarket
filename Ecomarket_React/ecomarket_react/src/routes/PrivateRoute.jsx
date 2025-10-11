import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ allowedRoles, children }) => {
  const role = localStorage.getItem("userRole");

  if (!role) {
    return <Navigate to="/iniciar-sesion" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
