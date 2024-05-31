// PostDetailHistory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../api/trueque.api';

function PostDetail({ postId, onSucursalLoaded }) {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sucursal, setSucursal] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${baseURL}post/${postId}/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                setPost(response.data);
                const sucursalResponse = await axios.get(`${baseURL}sucursal/${response.data.sucursal_destino.id}/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    }
                });
                setSucursal(sucursalResponse.data);
                // Llamar a la función de callback con la información de la sucursal
                onSucursalLoaded(sucursalResponse.data, postId);
            } catch (error) {
                setError('Error al obtener los detalles del post');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="post-detail">
            <h3>{post.titulo}</h3>
        </div>
    );
}

export default PostDetail;
