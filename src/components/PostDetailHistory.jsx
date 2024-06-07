import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../api/trueque.api';

function PostDetailHistory({ postId, onSucursalLoaded, includeSucursal }) {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

                if (includeSucursal && response.data.sucursal_destino) {
                    const sucursalResponse = await axios.get(`${baseURL}sucursal/${response.data.sucursal_destino.id}/`, {
                        headers: {
                            Authorization: `Token ${token}`,
                        }
                    });
                    const sucursalData = sucursalResponse.data;
                    // Llamar a la función de callback con la información de la sucursal
                    onSucursalLoaded && onSucursalLoaded(sucursalData, postId);
                }
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

export default PostDetailHistory;
