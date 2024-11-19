import Swal from 'sweetalert2';

export const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const getToken = () => localStorage.getItem('token');
export const setToken = (token) => localStorage.setItem('token', token);
export const removeToken = () => localStorage.removeItem('token');

export const getUsuarioActual = async () => {
    try {
        const response = await apiRequest({ endpoint: '/usuarios/me/', method: 'GET' });
        return response; // Devuelve la información del usuario
    } catch (error) {
        console.error('Error al obtener el usuario actual:', error);
        return null;
    }
};

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

        if (response.status === 401) {
            removeToken();
            window.location.href = '/login';
            return null;
        }

        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }

        // Manejo de respuestas vacías (204 No Content)
        if (response.status === 204) {
            return null; // O devuelve un objeto vacío si prefieres: return {};
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
