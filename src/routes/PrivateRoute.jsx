import React from "react";
import { Navigate } from "react-router-dom";

function getUserRoleFromToken() {
    const token = localStorage.getItem('token');
    if (!token) return [];

    try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decodificar el payload del token
        // El claim 'roles' es un string separado por comas
        if (payload.roles) {
            // Normalizar: quitar prefijo 'ROLE_' si existe
            return payload.roles.split(',').map(role => role.replace(/^ROLE_/, ''));
        }
        return [];
    } catch (error) {
        console.error('Error al decodificar el token:', error);
        return [];
    }
}

const PrivateRoute = ({ children, adminOnly = false, allowedRoles }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.log('No hay token, redirigiendo a /iniciar-sesion');
        return <Navigate to="/iniciar-sesion" replace />;
    }

    const roles = getUserRoleFromToken();
    console.log('Roles del usuario:', roles); // Depuración

    // Si se usa allowedRoles, verificar si el usuario tiene alguno de los roles permitidos

    if (allowedRoles && Array.isArray(allowedRoles)) {
        const hasAccess = roles.some(role => allowedRoles.includes(role));
        if (!hasAccess) {
            console.log('Acceso denegado, redirigiendo a /');
            return <Navigate to="/" replace />;
        }
    }

    // Compatibilidad con adminOnly
    if (adminOnly && !roles.includes('ADMIN')) {
        console.log('Acceso denegado, redirigiendo a /');
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;
