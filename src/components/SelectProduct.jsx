import React, { useState } from 'react';
import { useParams } from 'wouter';
import axios from 'axios';
import UserPosts from './UserPosts';
import '../styles/SelectProduct.css';
import { baseURL } from '../api/trueque.api';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Intercambiar() {
    const { id: publicacionDeseadaId } = useParams();
    const [selectedPost, setSelectedPost] = useState(null);
    const [intercambioSuccess, setIntercambioSuccess] = useState(false);
    const [horario, setHorario] = useState('');
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openSuccess, setOpenSuccess] = useState(false);

    const handlePostSelect = (post) => {
        setSelectedPost(post);
    };

    const handleIntercambioSubmit = async () => {
        if (!selectedPost) {
            setErrorMessage('Selecciona una publicación para intercambiar.');
            setOpenError(true);
            return;
        }

        if (!horario) {
            setErrorMessage('Selecciona un horario para el intercambio.');
            setOpenError(true);
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(baseURL + 'create-solicitud/', {
                publicacion_deseada: publicacionDeseadaId,
                publicacion_a_intercambiar: selectedPost.id,
                fecha_del_intercambio: horario,
            }, {
                headers: {
                    Authorization: `Token ${token}`,
                }
            });

            console.log(response.data);

            if (response.status === 201 && response.data) {
                setIntercambioSuccess(true);
                console.log(response.data.fecha_del_intercambio)
                setOpenSuccess(true);
            }
        } catch (error) {
            console.error('Error al crear la solicitud de intercambio:', error);
            if (error.response) {
                if (error.response.status === 400) {
                    setErrorMessage('Debes elegir un producto de la misma categoría que el original.');
                } else if (error.response.status === 404) {
                    setErrorMessage('La fecha seleccionada es inválida.');
                }
            } else {
                setErrorMessage('No se pudo conectar con el servidor.');
            }
            setOpenError(true);
        }
    };

    const handleCloseError = () => {
        setOpenError(false);
    };

    const handleCloseSuccess = () => {
        setOpenSuccess(false);
    };

    return (
        <div className="intercambiar-container">
            <UserPosts onPostSelect={handlePostSelect} isIntercambioMode={true} />
            {selectedPost && (
                <div>
                    <h2 className="selected-title">Has seleccionado: {selectedPost.titulo}</h2>
                    <TextField
                        label="Fecha y hora de intercambio"
                        type="datetime-local"
                        value={horario}
                        onChange={(e) => setHorario(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        className="input-horario"
                    />
                    <Button onClick={handleIntercambioSubmit} className='intercambio-button' variant="contained" color="primary" >
                        Solicitar Intercambio
                    </Button>
                </div>
            )}
            <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
                <MuiAlert elevation={6} variant="filled" onClose={handleCloseSuccess} severity="success">
                    La solicitud de intercambio se envió correctamente.
                </MuiAlert>
            </Snackbar>
            <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError}>
                <MuiAlert elevation={6} variant="filled" onClose={handleCloseError} severity="error">
                    {errorMessage}
                </MuiAlert>
            </Snackbar>
        </div>
    );
}

export default Intercambiar;
