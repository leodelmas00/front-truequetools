import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../api/trueque.api';
import { useParams } from "wouter";
import { Link } from 'wouter';
import '../styles/PostDetailStyle.css';

function PostDetail() {
    const [post, setPost] = useState(null);
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [nuevoComentario, setNuevoComentario] = useState('');
    const [reply, setReply] = useState(null);


    useEffect(() => {
        console.log(reply)


    }, [reply])

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
                console.log(response.data.imagen)
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

    const handleReplyChange = (event) => {
        setReply(event.target.value);
    };


    const handleSubmitReply = async (comentarioId, event) => {
        event.preventDefault();
        if (reply.trim() === '') {
            setErrorMessage('No es posible publicar una respuesta vacía');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseURL}post/${params.postId}/comments/${comentarioId}/`, {
                contenido: reply
            }, {
                headers: {
                    Authorization: `Token ${token}`,
                }
            });
            if (response.status === 201 && response.data) {
                setReply(response.data);
            }
        } catch (error) {
            console.error(error);
            setErrorMessage(error)
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (nuevoComentario.trim() === '') {
            setErrorMessage('No es posible publicar una pregunta vacía');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseURL}post/${params.postId}/comments/`, {
                contenido: nuevoComentario
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
                setErrorMessage('')
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
            <div className="post-container-detail">
                <div className="post-card">
                    <p className="post-date">{post.fecha}</p>
                    <hr></hr>
                    <h3>Subido por: {post.usuario_propietario.username}</h3>
                    <h1 className="post-title">{post.titulo}</h1>
                    <p className="post-description">{post.descripcion}</p>
                    {post.imagen && <img src={`http://127.0.0.1:8000${post.imagen}`} alt="Imagen del post" className='imagen-preview-detail' />}
                </div>
                <div className="post-comments">
                    <h2>Comentarios:</h2>
                    {post.comentarios.map((comentario, index) => (
                        <div key={index} className="comment">
                            <p className='comment-letter'><b>Por:</b> {comentario.usuario_propietario.username}</p>
                            <hr className='margenhr'></hr>
                            <div className='comment-letter'>{comentario.contenido}</div>
                            <div className='reply-section'>
                                <input
                                    type="text"
                                    placeholder="Responder..."
                                    className="input-field-reply"
                                    maxLength={200}
                                    onChange={handleReplyChange}
                                    disabled={comentario.respuesta !== null} // Deshabilitar el input si ya hay una respuesta
                                />
                                <button
                                    className="reply-button"
                                    onClick={(event) => handleSubmitReply(comentario.id, event)}
                                    disabled={comentario.respuesta !== null} // Deshabilitar el botón si ya hay una respuesta
                                >
                                    Enviar
                                </button>
                            </div>
                            {comentario.respuesta && (
                                <div className="respuesta-container">
                                    <div className="respuesta">
                                        <p className='comment-letter respuesta-letter'><b>Respuesta:</b> {comentario.respuesta.contenido}</p>
                                    </div>
                                </div>
                            )}
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
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    </form>
                </div>
            </div>
            <Link to="/SignIn" className={"signin-link-from-postdetail"}>Volver al inicio</Link>
        </div>
    );


}

export default PostDetail;
