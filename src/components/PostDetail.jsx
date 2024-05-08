import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { baseURL } from '../api/trueque.api';

function PostDetail() {
    const [post, setPost] = useState(null);
    const { postId } = useParams(); // Obtener el postId de los parámetros de la URL

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${baseURL}/post/${postId}/`);
                setPost(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchPost();
    }, [postId]);
    if (!post) {
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
