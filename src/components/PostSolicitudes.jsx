import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useRoute, Link } from "wouter";
import { baseURL } from "../api/trueque.api";
import { formatFechaHistorial, formatFechaSolicitud } from "../utils";
import '../styles/PostSolicitudes.css';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
} from '@mui/material';

function PostSolicitudes() {
    const [solicitudes, setSolicitudes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [selectedSolicitudId, setSelectedSolicitudId] = useState(null);
    const [match, params] = useRoute('/post/:postId/solicitudes');

    useEffect(() => {
        const fetchSolicitudes = async () => {
            try {
                const token = localStorage.getItem('token');
                const postResponse = await axios.get(`${baseURL}post/${params.postId}/solicitudes`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    }
                });
                setSolicitudes(postResponse.data);
            } catch (error) {
                console.error('Error al obtener solicitudes de intercambio:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSolicitudes();
    }, [params.postId]);

    const handleAceptar = async (solicitudId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.patch(`${baseURL}mis-solicitudes/${solicitudId}/`, { estado: 'PENDIENTE' }, {
                headers: {
                    Authorization: `Token ${token}`,
                }
            });

            // Filtra las solicitudes eliminadas
            const publicacionDeseadaId = solicitudes.find(s => s.id === solicitudId).publicacion_deseada;
            const nuevasSolicitudes = solicitudes.filter(solicitud => solicitud.publicacion_deseada !== publicacionDeseadaId);
            setSolicitudes(nuevasSolicitudes);
            setTimeout(() => {
                window.location.href = '/Historial';
            }, 1500);
        } catch (error) {
            console.error('Error al aceptar la solicitud:', error);
        }
    };

    const handleRechazar = async (solicitudId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${baseURL}mis-solicitudes/${solicitudId}/`, {
                headers: {
                    Authorization: `Token ${token}`,
                }
            });

            if (response.status === 204) {
                const nuevasSolicitudes = solicitudes.filter(solicitud => solicitud.id !== solicitudId);
                setSolicitudes(nuevasSolicitudes);
            }
        } catch (error) {
            console.error('Error al rechazar la solicitud:', error);
        }
    };

    const confirmRechazar = (solicitudId) => {
        setSelectedSolicitudId(solicitudId);
        setOpenConfirmDialog(true);
    };

    const handleCloseConfirmDialog = () => {
        setOpenConfirmDialog(false);
        setSelectedSolicitudId(null);
    };

    const handleConfirmRechazar = () => {
        if (selectedSolicitudId) {
            handleRechazar(selectedSolicitudId);
        }
        handleCloseConfirmDialog();
    };

    return (
        <div className="post-solicitudes-container">
            <Link to={`/post/${params.postId}/`} className="btn-volver">
                <button>Volver al inicio</button>
            </Link>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <div>
                    {solicitudes.length === 0 ? (
                        <p className="no-solicitudes-message">No hay solicitudes de intercambio.</p>
                    ) : (
                        solicitudes.map((solicitud) => (
                            <div key={solicitud.id} className="solicitud">
                                <p>Recibida el {formatFechaHistorial(solicitud.fecha)}</p>
                                <p>
                                    {solicitud.publicacion_a_intercambiar.usuario_propietario.username} te ofreció intercambiar su{' '}
                                    <a href={`http://localhost:3000/post/${solicitud.publicacion_a_intercambiar.id}/`} className="enlace-clickeable">
                                        {solicitud.publicacion_a_intercambiar.titulo}
                                    </a>
                                    <h4>Fecha y horario: {formatFechaSolicitud(solicitud.fecha_del_intercambio)}</h4>
                                    {solicitud.publicacion_a_intercambiar.imagen && (
                                        <div>
                                            <p>Imagen del producto:</p>
                                            <img className="preview-img" src={`http://127.0.0.1:8000/${solicitud.publicacion_a_intercambiar.imagen}/`} alt="imagen del post" />
                                        </div>
                                    )}
                                    <h5>* Recuerda: si te interesa el producto pero no puedes asistir en el horario proporcionado, puedes
                                        rechazar la solicitud y crear una nueva con otro horario en la publicación del producto deseado!
                                    </h5>
                                </p>
                                <div>
                                    <button className="btn-aceptar" onClick={() => handleAceptar(solicitud.id)}>Aceptar</button>
                                    <button className="btn-rechazar" onClick={() => confirmRechazar(solicitud.id)}>Rechazar</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
            <Dialog
                open={openConfirmDialog}
                onClose={handleCloseConfirmDialog}
                aria-labelledby="confirm-dialog-title"
                aria-describedby="confirm-dialog-description"
            >
                <DialogTitle id="confirm-dialog-title">Confirmar</DialogTitle>
                <DialogContent>
                    <DialogContentText id="confirm-dialog-description">
                        ¿Estás seguro que quieres rechazar esta solicitud?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmDialog} color="primary">
                        No
                    </Button>
                    <Button onClick={handleConfirmRechazar} color="primary" autoFocus>
                        Sí
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default PostSolicitudes;
