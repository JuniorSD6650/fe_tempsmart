import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');  // Verificamos si el token está almacenado
    return token ? children : <Navigate to="/login" />;  // Redirige al login si no está autenticado
};

export default PrivateRoute;
