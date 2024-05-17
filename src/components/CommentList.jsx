import React, { useState } from 'react';
import axios from 'axios';
import { baseURL } from '../api/trueque.api';
import '../styles/PostDetailStyle.css';

function CommentList({ comments, postId, userInfo, updateComments, postOwnerId }) {
    const [reply, setReply] = useState('');

    const handleReplyChange = (event) => {
        setReply(event.target.value);
    };

    const handleSubmitReply = async (comentarioId, event) => {
        event.preventDefault();
        if (!reply || reply.trim() === '') {
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseURL}post/${postId}/comments/${comentarioId}/`, {
                contenido: reply
            }, {
                headers: {
                    Authorization: `Token ${token}`,
                }
            });
            if (response.status === 201 && response.data) {
                updateComments(comentarioId, response.data);
                setReply(''); // Resetear el input de respuesta
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {comments.map((comentario, index) => (
                <div key={index} className="comment">
                    {comentario.fecha}
                    <hr />
                    <p className='comment-letter'><b>Por:</b> {comentario.usuario_propietario.username} </p>
                    <hr className='margenhr' />
                    <div className='comment-letter'>{comentario.contenido}</div>
                    {userInfo && userInfo.id === postOwnerId && (
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
                                disabled={comentario.respuesta !== null}
                            >
                                Enviar
                            </button>
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
