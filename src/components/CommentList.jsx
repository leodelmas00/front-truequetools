import React, { useState } from 'react';
import axios from 'axios';
import { baseURL } from '../api/trueque.api';
import '../styles/PostDetailStyle.css';
import { formatFecha } from '../utils';


function CommentList({ comments, postId, userInfo, updateComments, postOwnerId }) {
    const [replies, setReplies] = useState({});
    const [errorMessages, setErrorMessages] = useState({});

    const handleReplyChange = (commentId, event) => {
        setReplies({
            ...replies,
            [commentId]: event.target.value,
        });
    };

    const handleSubmitReply = async (commentId, event) => {
        event.preventDefault();
        if (!replies[commentId] || replies[commentId].trim() === '') {
            setErrorMessages((prevErrors) => ({
                ...prevErrors,
                [commentId]: 'No es posible publicar una respuesta vacía',
            }));
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseURL}post/${postId}/comments/${commentId}/`, {
                contenido: replies[commentId],
            }, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            if (response.status === 201 && response.data) {
                updateComments(commentId, response.data);
                setReplies((prevReplies) => ({
                    ...prevReplies,
                    [commentId]: '', // Resetear el input de respuesta para este comentario
                }));
                setErrorMessages((prevErrors) => ({
                    ...prevErrors,
                    [commentId]: '', // Limpiar mensaje de error para este comentario
                }));
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {comments.map((comentario, index) => (
                <div key={index} className="comment">
                    <p className='comment-letter'><b> {formatFecha(comentario.fecha)} por:</b> {comentario.usuario_propietario.username}</p>
                    <hr className='margenhr' />
                    <div className='comment-letter'>{comentario.contenido}</div>
                    {userInfo && userInfo.id === postOwnerId && !comentario.respuesta && (
                        <div className='reply-section'>
                            <div className="input-button-container">
                                <input
                                    type="text"
                                    placeholder="Responder..."
                                    className="input-field-reply"
                                    maxLength={200}
                                    onChange={(event) => handleReplyChange(comentario.id, event)}
                                    disabled={comentario.respuesta !== null} // Deshabilitar el input si ya hay una respuesta
                                    value={replies[comentario.id] || ''}
                                />
                                <button
                                    className="reply-button"
                                    onClick={(event) => handleSubmitReply(comentario.id, event)}
                                    disabled={comentario.respuesta !== null}
                                >
                                    Enviar
                                </button>
                            </div>
                            {errorMessages[comentario.id] && (
                                <p style={{ color: 'red', marginTop: '5px' }}>{errorMessages[comentario.id]}</p>
                            )}
                        </div>
                    )}
                    {comentario.respuesta && (
                        <div className="respuesta-container">
                            <div className="respuesta">
                                <p className='comment-letter respuesta-letter'><b>Respuesta:</b> {comentario.respuesta.contenido}</p>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );


}



export default CommentList;
