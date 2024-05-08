import axios from 'axios';
export const baseURL = 'http://127.0.0.1:8000/api/'

export const getAllPosts = () => {
    return axios.get(`${baseURL}publicaciones/`)
}

export const getAllUsers = () => {
    return axios.get(`${baseURL}usuarios/`)
}

export const getAllComments = () => {
    return axios.get(`${baseURL}comentarios/`)
}

export const getAllCategorias = () => {
    return axios.get(`${baseURL}categorias/`)
}

export const getAllSucursales = () => {
    return axios.get(`${baseURL}sucursales/`)
}
