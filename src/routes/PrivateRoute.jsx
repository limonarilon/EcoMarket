import React from "react";
import { Navigate } from "react-router-dom";

function getUserRoleFromToken() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decodificar el payload del token
        console.log('Payload del token:', payload); // Depuración
        return payload.roles || null; // Asegúrate de que coincida con el campo "roles" del token
    } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
    }
}

const PrivateRoute = ({ children, adminOnly = false }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.log('No hay token, redirigiendo a /iniciar-sesion');
        return <Navigate to="/iniciar-sesion" replace />;
    }

    const role = getUserRoleFromToken();
    console.log('Rol del usuario:', role); // Depuración

    if (adminOnly && role !== 'ROLE_ADMIN') {
        console.log('Acceso denegado, redirigiendo a /');
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;
