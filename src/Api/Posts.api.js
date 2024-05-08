// Posts.api.js

import axios from 'axios';

export const getAllPosts = () => {
    return axios.get('http://127.0.0.1:8000/api/publicaciones/');
}



