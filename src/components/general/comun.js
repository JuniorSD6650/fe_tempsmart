// comun.js
import Swal from 'sweetalert2';

export const API_BASE_URL = 'http://127.0.0.1:8000/api';
//export const API_BASE_URL = 'https://mi-backend.loca.lt/api';

// Función para obtener el token del localStorage
export const getToken = () => localStorage.getItem('token');

// Función para guardar el token en el localStorage
export const setToken = (token) => localStorage.setItem('token', token);

// Función para eliminar el token (para logout, por ejemplo)
export const removeToken = () => localStorage.removeItem('token');

// comun.js

export const apiRequest = async ({ endpoint, method = 'GET', body = null }) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
        };
        
        const token = getToken();
        if (token) headers['Authorization'] = `Token ${token}`;

        const options = {
            method,
            headers,
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const url = `${API_BASE_URL}${endpoint}`;
        const response = await fetch(url, options);

        // Si la respuesta es 204 No Content, devolver null o un objeto vacío
        if (response.status === 204) {
            return null;  // o `return {}` si prefieres un objeto vacío
        }

        // Verificar si la respuesta fue exitosa
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const confirmarAccion = async (titulo = "¿Estás seguro?", texto = "No podrás deshacer esta acción") => {
    const result = await Swal.fire({
        title: titulo,
        text: texto,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });
    return result.isConfirmed;
};

export const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
