import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'wouter';
import { formatFechaSolicitud } from '../utils';
import '../styles/EmployeeView.css';
import { baseURL } from '../api/trueque.api';
import PostDetailHistory from './PostDetailHistory';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function EmployeeView() {
    const [solicitudes, setSolicitudes] = useState([]);
    const [trueques, setTrueques] = useState(false);
    const [error, setError] = useState(null);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogout = () => {
        localStorage.setItem('loggedIn', false);
        localStorage.setItem('userEmail', '');
        window.location.href = '/Login-worker';
    };
    const loadSolicitudes = async () => {
        try {
            const loggedIn = localStorage.getItem('loggedIn');
            const userEmail = localStorage.getItem('userEmail'); // Obtener el email del localStorage
            if (loggedIn === 'true') {
                try {
                    console.log(`${baseURL}employee/solicitudes/`);
                    const response = await axios.get(`${baseURL}employee/solicitudes/`, {
                        headers: {
                            'X-User-Email': userEmail
                        }
                    });
                    console.log(response.data);
                    setSolicitudes(response.data);
                    setTrueques(true); // Asegúrate de activar la visualización de trueques
                    return response.data;
                } catch (error) {
                    console.error('Error en la solicitud:', error);
                    setErrorMessage('Error al obtener las solicitudes.');
                    setOpenError(true);
                }
            } else {
                setErrorMessage('Debes iniciar sesión para ver las solicitudes.');
                setOpenError(true);
                setTimeout(() => {
                    window.location.href = '/Login-worker';
                }, 1500);
            }
        } catch (error) {
            console.error('Error desconocido:', error);
            setErrorMessage('Error desconocido al obtener las solicitudes.');
            setOpenError(true);
        }
    };

    const loadSolicitudesDelDia = async () => {
        try {
            const loggedIn = localStorage.getItem('loggedIn');
            const userEmail = localStorage.getItem('userEmail');
            if (loggedIn === 'true') {
                try {
                    console.log(`${baseURL}employee/solicitudes/today/`);
                    const response = await axios.get(`${baseURL}employee/solicitudes/today/`, {
                        headers: {
                            'X-User-Email': userEmail
                        }
                    });
                    console.log(response.data);
                    setSolicitudes(response.data);
                    setTrueques(true); // Asegúrate de activar la visualización de trueques
                    return response.data;
                } catch (error) {
                    console.error('Error en la solicitud:', error);
                    setErrorMessage('Error al obtener las solicitudes.');
                    setOpenError(true);
                }
            } else {
                setErrorMessage('Debes iniciar sesión para ver las solicitudes.');
                setOpenError(true);
                setTimeout(() => {
                    window.location.href = '/Login-worker';
                }, 1500);
            }
        } catch (error) {
            console.error('Error desconocido:', error);
            setErrorMessage('Error desconocido al obtener las solicitudes.');
            setOpenError(true);
        }
    };

    const handleCloseError = () => {
        setOpenError(false);
    };

    return (
        <div className="employee-panel">
            <div className="employee-navigation-bar">
                <div>
                    <h1 className="employee-nav-titulo"> Panel de empleado </h1>
                    <hr className='employee-separador' />
                    <button className="employee-nav-button" onClick={handleLogout}>Cerrar Sesión</button>
                    <button className="employee-nav-button" onClick={loadSolicitudes}>Ver Trueques activos</button>
                    <button className="employee-nav-button" onClick={loadSolicitudesDelDia}>Ver Trueques del día</button>

                </div>
            </div>
            <div className="employee-elements">
                {trueques && (
                    <table className="employee-table">
                        <thead>
                            <tr>
                                <th>1er Articulo</th>
                                <th>2do Articulo</th>
                                <th>Fecha del trueque</th>
                            </tr>
                        </thead>
                        <tbody>
                            {solicitudes.map((solicitud) => (
                                <tr key={solicitud.id}>
                                    <td>
                                        <PostDetailHistory postId={solicitud.publicacion_deseada} includeSucursal={false} />
                                    </td>
                                    <td>
                                        <PostDetailHistory postId={solicitud.publicacion_a_intercambiar} includeSucursal={false} />
                                    </td>
                                    <td>{formatFechaSolicitud(solicitud.fecha_del_intercambio)}</td>

                                    <Link href={`/tradeCheck/${solicitud.id}`}>
                                        <button className="employee-gestionar-button employee-gestionar-button-margin">Gestionar Trueque</button>
                                    </Link>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError}>
                <MuiAlert elevation={6} variant="filled" onClose={handleCloseError} severity="error">
                    {errorMessage}
                </MuiAlert>
            </Snackbar>
        </div>
    );
}

export default EmployeeView;
