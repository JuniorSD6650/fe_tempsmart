// comun.js

export const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Función para obtener el token del localStorage
export const getToken = () => localStorage.getItem('token');

// Función para guardar el token en el localStorage
export const setToken = (token) => localStorage.setItem('token', token);

// Función para eliminar el token (para logout, por ejemplo)
export const removeToken = () => localStorage.removeItem('token');

// Función genérica para hacer solicitudes API
export const apiRequest = async ({ endpoint, method = 'GET', body = null }) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
        };
        
        const token = getToken();
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const options = {
            method,
            headers,
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const url = `${API_BASE_URL}${endpoint}`;
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};
