import axios from 'axios';
export const baseURL = 'https://truequetools.onrender.com/api/'

export const getAllPosts = () => {
    const token = localStorage.getItem('token');
    return axios.get(`${baseURL}publicaciones/`, {
        headers: {
            Authorization: `Token ${token}`
        }
    });
}

export const getMyPosts = () => {
    const token = localStorage.getItem('token');
    return axios.get(`${baseURL}misProductos/`, {
        headers: {
            Authorization: `Token ${token}`
        }
    });
}

export const getAllEmployees = () => {
    return axios.get(`${baseURL}empleados/`);
}

export const getUserInfo = () => {
    const token = localStorage.getItem('token');

    return axios.get(`${baseURL}user-info/`, {
        headers: {
            Authorization: `Token ${token}`
        }
    });
}

export const getAllUsers = () => {
    const token = localStorage.getItem('token');

    return axios.get(`${baseURL}usuarios/`, {
        headers: {
            Authorization: `Token ${token}`
        }
    });
}

export const getAllComments = () => {
    const token = localStorage.getItem('token');

    return axios.get(`${baseURL}comentarios/`, {
        headers: {
            Authorization: `Token ${token}`
        }
    });
}

export const getAllCategorias = () => {
    const token = localStorage.getItem('token');

    return axios.get(`${baseURL}categorias/`, {
        headers: {
            Authorization: `Token ${token}`
        }
    });
}

export const getAllSucursales = () => {
    const token = localStorage.getItem('token');

    return axios.get(`${baseURL}sucursales/`, {
        headers: {
            Authorization: `Token ${token}`
        }
    });
}

