// Historial.js
import React, { useState, useEffect } from 'react';
import '../styles/Historial.css';
import { baseURL } from '../api/trueque.api';
import axios from 'axios';
import { formatFechaSolicitud } from '../utils';
import PostDetailHistory from './PostDetailHistory';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function Historial() {
    const [solicitudesConSucursal, setSolicitudesConSucursal] = useState([]);
    const [error, setError] = useState(null);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);

    useEffect(() => {
        const fetchHistorial = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${baseURL}historial/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
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

    const handleDelete = async (postid) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${baseURL}solicitudes/${postid}/cancel`, {
                headers: {
                    Authorization: `Token ${token}`,
                }
            });
            console.log(response.status);
            if (response.status === 204) {
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
            }
        }
    };

    const handleSuccessClose = () => {
        setOpenSuccess(false);
    };

    const handleCloseError = () => {
        setOpenError(false);
    };

    return (
        <div className='Historial'>
            <h1 className='Titulo'> HISTORIAL </h1>
            <hr className='separador'></hr>
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
                                <td>
                                    <PostDetailHistory postId={solicitud.publicacion_a_intercambiar} onSucursalLoaded={(sucursal) => handleSucursalLoaded(sucursal, solicitud.publicacion_a_intercambiar)} />
                                </td>
                                <td>
                                    <PostDetailHistory postId={solicitud.publicacion_deseada} onSucursalLoaded={(sucursal) => handleSucursalLoaded(sucursal, solicitud.publicacion_deseada)} />
                                </td>
                                <td>{formatFechaSolicitud(solicitud.fecha_del_intercambio)}</td>
                                <td>{solicitud.sucursal ? `${solicitud.sucursal.nombre} - ${solicitud.sucursal.direccion}` : ''}</td>
                                <td>{solicitud.estado}</td>
                                {solicitud.estado === "PENDIENTE" && (
                                    <button className='boton-cancelar' onClick={() => handleDelete(solicitud.id)}>Cancelar</button>
                                )}
                                <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError}>
                                    <MuiAlert elevation={6} variant="filled" onClose={handleCloseError} severity="error">
                                        {error}
                                    </MuiAlert>
                                </Snackbar>
                                <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleSuccessClose}>
                                    <MuiAlert elevation={6} variant="filled" onClose={handleSuccessClose} severity="success">
                                        Se cancelo con exito!
                                    </MuiAlert>
                                </Snackbar>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Historial;
