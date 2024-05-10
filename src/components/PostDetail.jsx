import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../api/trueque.api';
import { useParams } from "wouter";
import { Link } from 'wouter';
import '../styles/PostDetailStyle.css';

function PostDetail() {
    const [post, setPost] = useState(null);
    const [nuevoComentario, setNuevoComentario] = useState('');
    const params = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${baseURL}post/${params.postId}/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    }
                });
                setPost(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
            finally {
                setLoading(false);
            }
        };
        if (loading) {
            fetchPost();
        }
    }, [params.postId, loading]);

    const handleInputChange = (event) => {
        setNuevoComentario(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseURL}post/${params.postId}/comments/`, {
                contenido: nuevoComentario // Agregar el contenido del comentario
            }, {
                headers: {
                    Authorization: `Token ${token}`,
                }
            });
            if (response.status === 201 && response.data) {
                setPost(prevPost => ({
                    ...prevPost,
                    comentarios: [...prevPost.comentarios, response.data]
                }));
                setNuevoComentario('');
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
            <div className="background-image-published">
                <div className="post-container">
                    <div className="post-card">
                        <p className="post-date">{post.fecha}</p>
                        <hr></hr>
                        <h3>Subido por: {post.usuario_propietario.username}</h3>
                        <h1 className="post-title">{post.titulo}</h1>
                        
                        <p className="post-description">{post.descripcion}</p>
                    </div>
                    <div className="post-comments">
                        <h2>Comentarios:</h2>
                        {post.comentarios.map((comentario, index) => (
                            <div key={index} className="comment">
                                <p className='comment-letter'><b>Por:</b> {comentario.usuario_propietario.username}</p>
                                <hr className='margenhr'></hr>
                                <div className='comment-letter'>{comentario.contenido}</div>
                                
                                
                            </div>
                        ))}
                        <form onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="text"
                                value={nuevoComentario}
                                onChange={handleInputChange}
                                placeholder="Escribe un comentario..."
                                className="input-field-comment"
                                maxLength={200}
                            />
                        </div>
                        <button type="submit" className="comment-button">Enviar</button>
                        <p>Caracteres ingresados: {nuevoComentario.length}/200</p>
                        </form>
                    </div>
                </div>
                
                
                    <Link to="/SignIn" className={"signin-link-from-postdetail"}>Volver al inicio</Link>
                
            </div>
    );
}

export default PostDetail;
