import React, { useState, useEffect } from 'react';
import '../styles/Historial.css';
import { baseURL, getUserInfo } from '../api/trueque.api';
import axios from 'axios';
import { Link } from 'wouter';
import { formatFechaSolicitud } from '../utils';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


function Historial() {
    const [solicitudesConSucursal, setSolicitudesConSucursal] = useState([]);
    const [error, setError] = useState(null);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedSolicitudId, setSelectedSolicitudId] = useState(null);
    const [userInfo, setUserInfo] = useState(null);


    useEffect(() => {
        const fetchHistorial = async () => {
            try {
                const userInfoResponse = await getUserInfo();
                setUserInfo(userInfoResponse.data);
                const token = localStorage.getItem('token');
                const response = await axios.get(`${baseURL}historial/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                console.log(response.data)
                setSolicitudesConSucursal(response.data);
            } catch (error) {
                setError('Error al obtener el historial de solicitudes');
                console.error(error);
            }
        };

        fetchHistorial();
    }, []);

    const handleSucursalLoaded = (sucursal, postId) => {
        setSolicitudesConSucursal(prevSolicitudes => {
            return prevSolicitudes.map(solicitud => {
                if (solicitud.publicacion_a_intercambiar === postId || solicitud.publicacion_deseada === postId) {
                    return { ...solicitud, sucursal };
                }
                return solicitud;
            });
        });
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${baseURL}solicitudes/${selectedSolicitudId}/cancel`, {
                headers: {
                    Authorization: `Token ${token}`,
                }
            });
            if (response.status === 204) {
                setSolicitudesConSucursal(prevSolicitudes =>
                    prevSolicitudes.filter(solicitud => solicitud.id !== selectedSolicitudId)
                );
                setOpenSuccess(true);
            }
        } catch (error) {
            console.log(error);
            if (error.response && (error.response.status === 409 || error.response.status === 400)) {
                setError('No se puede cancelar un trueque con menos de un dia de anticipacion');
                setOpenError(true);
            } else {
                console.error('Error:', error);
                setError('Ha ocurrido un error. Por favor, inténtelo nuevamente.');
                setOpenError(true);
            }
        } finally {
            setOpenDialog(false);
        }
    };

    const handleDialogOpen = (solicitudId) => {
        setSelectedSolicitudId(solicitudId);
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleSuccessClose = () => {
        setOpenSuccess(false);
    };

    const handleCloseError = () => {
        setOpenError(false);
    };

    return (
        <div className='Historial'>
            <div className='historial-navigation-bar'>
                <Link to="/signin" className="historial-link-volver">
                    <button className="historial-button">Volver</button>
                </Link>
                <h1 className='Titulo'> HISTORIAL </h1>
            </div>
            <div className='Historial-box'>
                <table className="tabla">
                    <thead>
                        <tr>
                            <th>Mi Articulo</th>
                            <th>Su Articulo</th>
                            <th>Fecha del Intercambio</th>
                            <th>Sucursal</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {solicitudesConSucursal.map((solicitud) => (
                            <tr key={solicitud.id}>
                                <td><h4>
                                    {userInfo.id === solicitud.publicacion_a_intercambiar.usuario_propietario.id
                                        ? solicitud.publicacion_a_intercambiar.titulo
                                        : solicitud.publicacion_deseada.titulo}</h4>
                                </td>
                                <td><h4>
                                    {userInfo.id === solicitud.publicacion_a_intercambiar.usuario_propietario.id
                                        ? solicitud.publicacion_deseada.titulo
                                        : solicitud.publicacion_a_intercambiar.titulo}</h4>
                                </td>
                                <td><h4> {formatFechaSolicitud(solicitud.fecha_del_intercambio)}</h4></td>
                                <td><h4> {solicitud.publicacion_deseada.sucursal_destino.nombre} - {solicitud.publicacion_deseada.sucursal_destino.direccion}</h4></td>
                                <td><h4>{solicitud.estado} {solicitud.estado === "EXITOSA" && (<h5 style={{ color: 'green' }} > +100 pts! </h5>)}</h4></td>
                                {solicitud.estado === "PENDIENTE" && (
                                    <button className='boton-cancelar' onClick={() => handleDialogOpen(solicitud.id)}>Cancelar</button>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Dialog
                open={openDialog}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirmar Cancelación"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Estás seguro que quieres cancelar el trueque?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleDelete} color="primary" autoFocus>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError}>
                <MuiAlert elevation={6} variant="filled" onClose={handleCloseError} severity="error">
                    {error}
                </MuiAlert>
            </Snackbar>
            <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleSuccessClose}>
                <MuiAlert elevation={6} variant="filled" onClose={handleSuccessClose} severity="success">
                    ¡Se canceló con éxito!
                </MuiAlert>
            </Snackbar>
        </div >
    );
}

export default Historial;
