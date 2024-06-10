import React, { useState } from 'react';
import axios from 'axios';
import { baseURL } from '../api/trueque.api';
import '../styles/PostDetailStyle.css';
import { formatFecha } from '../utils';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

function CommentList({ comments, postId, userInfo, updateComments, postOwnerId, deleteComment }) {
    const [replies, setReplies] = useState({});
    const [errorMessages, setErrorMessages] = useState({});
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);

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

    const handleDelete = async (publicacionId, comentarioId, email) => {
        setCommentToDelete({ publicacionId, comentarioId, email });
        setConfirmationOpen(true);
    };

    const handleConfirmationClose = async (confirmed) => {
        setConfirmationOpen(false);
        if (confirmed && commentToDelete) {
            const { publicacionId, comentarioId, email } = commentToDelete;
            if (email === 'admin@truequetools.com') {
                try {
                    await axios.delete(`${baseURL}post-admin/${publicacionId}/comments/${comentarioId}/delete/`, {
                        headers: {
                            'X-User-Email': email
                        }
                    });
                    deleteComment(comentarioId);
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    const token = localStorage.getItem('token');
                    await axios.delete(`${baseURL}post/${publicacionId}/comments/${comentarioId}/delete/`, {
                        headers: {
                            Authorization: `Token ${token}`,
                        }
                    });
                    deleteComment(comentarioId); // Pasamos el ID del comentario eliminado
                } catch (error) {
                    console.log(error);
                    if (error.response && (error.response.status === 409 || error.response.status === 400)) {
                        console.error('Error:', error);
                    }
                }
            }
        }
    };

    return (
        <div>
            {comments.map((comentario, index) => (
                <div key={index} className="comment">
                    <p className='comment-letter' style={{ display: 'flex', alignItems: 'center' }}>
                        {formatFecha(comentario.fecha)} por {comentario.usuario_propietario.username}
                        {userInfo &&
                            (userInfo.id === comentario.usuario_propietario.id && !comentario.respuesta || userInfo.email === 'admin@truequetools.com') && (
                                <button className="eliminar-comentario" onClick={() => handleDelete(postId, comentario.id, userInfo.email)}>Eliminar</button>
                            )
                        }
                    </p>
                    <hr className='margenhr' />
                    <div className='comment-letter'>{comentario.contenido}</div>
                    {(userInfo && (userInfo.id === postOwnerId) && !comentario.respuesta) && (
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
                            <hr />
                            <div className="respuesta">
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    {formatFecha(comentario.respuesta.fecha)} por el propietario del post
                                </div>
                                <p className='comment-letter respuesta-letter'><b>Respuesta:</b> {comentario.respuesta.contenido}</p>
                            </div>
                        </div>
                    )}
                </div>
            ))}
            <Dialog
                open={confirmationOpen}
                onClose={() => handleConfirmationClose(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Confirmar eliminación</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Está seguro que quiere eliminar este comentario?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleConfirmationClose(false)} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={() => handleConfirmationClose(true)} color="primary" autoFocus>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CommentList;
