import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../api/trueque.api';
import { useParams } from "wouter";

function PostDetail() {
    const [post, setPost] = useState(null);
    const params = useParams(); // Obtener el postId de los parámetros de la URL
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPost = async () => {
            try {

                console.log(params.postId);
                const token = localStorage.getItem('token'); // Obtener el token JWT del almacenamiento local
                console.log(token)
                const response = await axios.get(`${baseURL}post/${params.postId}/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    }
                });
                setPost(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error:', error);
            }
            finally {
                setLoading(false)
            }
        };
        if (loading) {
            fetchPost();
        }
    }, [post, loading]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h1>{post.titulo}</h1>
            <p>{post.descripcion}</p>

        </div>
    );
}

export default PostDetail;
