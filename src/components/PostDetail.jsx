import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../api/trueque.api';
import { useParams } from "wouter";
import '../styles/PostDetailStyle.css'


function PostDetail() {
    const [post, setPost] = useState(null);
    const [nuevoComentario, setNuevoComentario] = useState(''); // Estado para el nuevo comentario
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

    // Manejador de cambios para el input del comentario
    const handleInputChange = (event) => {
        setNuevoComentario(event.target.value);
    };

    // Manejador de envío del formulario de comentario
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseURL}post/${params.postId}/comments/`, {
                headers: {
                    Authorization: `Token ${token}`,
                }
            });
            console.log(response.status);
            if (response.status === 201 && response.data) {
                console.log("COMENTARIO ENVIADO");
                setPost(prevPost => ({
                    ...prevPost,
                    comentarios: [...prevPost.comentarios, response.data]
                }));
                setNuevoComentario('');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="post-container">
            <div className="post-card">
                <p className="post-date">{post.fecha}</p>
                <h3>Subido por: {post.usuario_propietario.username}</h3>
                <h1 className="post-title">{post.titulo}</h1>
                <p className="post-description">{post.descripcion}</p>
            </div>
            <div className="post-comments">
                <h2>Comentarios:</h2>
                {post.comentarios.map((comentario, index) => (
                    <div key={index} className="comment">
                        <p>{comentario.contenido}</p>
                        <p>Por: {comentario.usuario_propietario.username}</p>
                    </div>
                ))}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={nuevoComentario}
                        onChange={handleInputChange}
                        placeholder="Escribe un comentario..."
                        className="comment-input"
                    />
                    <button type="submit" className="comment-button">Enviar</button>
                </form>
            </div>
        </div>
    );
}

export default PostDetail;
