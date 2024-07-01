import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'wouter';
import { formatFechaSolicitud } from '../utils';
import '../styles/EmployeeView.css';
import { baseURL } from '../api/trueque.api';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function EmployeeView() {
    const [solicitudes, setSolicitudes] = useState([]);
    const [trueques, setTrueques] = useState(false);
    const [error, setError] = useState(null);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const isAdminValue = localStorage.getItem('isAdmin');
        if (isAdminValue === 'true') {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.setItem('loggedIn', false);
        localStorage.setItem('userEmail', '');
        window.location.href = '/Login-worker';
    };

    const loadSolicitudesHelper = async (endpoint, errorMessage) => {
        try {
            const loggedIn = localStorage.getItem('loggedIn');
            const userEmail = localStorage.getItem('userEmail');
            if (loggedIn === 'true') {
                try {
                    console.log(`${baseURL}${endpoint}`);
                    const response = await axios.get(`${baseURL}${endpoint}`, {
                        headers: {
                            'X-User-Email': userEmail
                        }
                    });
                    console.log(response.data);
                    setSolicitudes(response.data);
                    setTrueques(true);
                    return response.data;
                } catch (error) {
                    console.error('Error en la solicitud:', error);
                    setErrorMessage('Error al obtener las solicitudes.');
                    setOpenError(true);
                }
            } else {
                setErrorMessage(errorMessage);
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

    const handleNavigation = async (path, errorMessage) => {
        try {
            const loggedIn = localStorage.getItem('loggedIn');
            const isAdminValue = localStorage.getItem('isAdmin');
            if (loggedIn === 'true' && isAdminValue === 'true') {
                window.location.href = path;
            } else {
                setErrorMessage(errorMessage);
                setOpenError(true);
                setTimeout(() => {
                    window.location.href = '/Login-worker';
                }, 1500);
            }
        } catch (error) {
            console.error('Error desconocido:', error);
            setErrorMessage('Error desconocido al redirigir.');
            setOpenError(true);
        }
    };

    const loadSolicitudes = () => loadSolicitudesHelper('employee/solicitudes/', 'Debes iniciar sesión para ver las solicitudes.');
    const loadSolicitudesExitosas = () => loadSolicitudesHelper('employee/solicitudes/success', 'Debes iniciar sesión para ver las solicitudes exitosas.');
    const loadSolicitudesFallidas = () => loadSolicitudesHelper('employee/solicitudes/failure', 'Debes iniciar sesión para ver las solicitudes fallidas.');
    const loadSolicitudesDelDia = () => loadSolicitudesHelper('employee/solicitudes/today/', 'Debes iniciar sesión para ver las solicitudes de hoy.');

    const handlePublicaciones = () => handleNavigation('/PostList', 'Debes iniciar sesión para ver las publicaciones.');
    const handleEmpleados = () => handleNavigation('/adminview/employees', 'Debes iniciar sesión para ver los empleados.');
    const handleSucursales = () => handleNavigation('/adminview/sucursales', 'Debes iniciar sesión para ver las sucursales.');
    const handleUsuarios = () => handleNavigation('/adminview/Users', 'Debes iniciar sesión para ver a los usuarios.');
    const handleVentas = () => handleNavigation('/adminview/Ventas', 'Debes iniciar sesión para ver las ventas.');

    const handleCloseError = () => {
        setOpenError(false);
    };

    return (
        <div className="employee-panel">
            <div className="employee-navigation-bar">
                <div>
                    {isAdmin ? (
                        <div className='admin-elements'>
                            <h1 className="admin-nav-titulo"> Panel de administrador </h1>
                            <hr className='employee-separador' style={{ borderBlockColor: '#5050ff' }} />

                            <button className="admin-nav-button" onClick={handleLogout}>Cerrar Sesión</button>
                            <button className="admin-nav-button" onClick={loadSolicitudes}>Ver Trueques activos</button>
                            <button className="admin-nav-button" onClick={loadSolicitudesDelDia}>Ver Trueques del día</button>
                            <button className="admin-nav-button" onClick={loadSolicitudesExitosas}>Ver trueques exitosos</button>
                            <button className="admin-nav-button" onClick={loadSolicitudesFallidas}>Ver trueques fallidos</button>
                            <button className="admin-nav-button" onClick={handlePublicaciones}>Ver publicaciones</button>
                            <button className="admin-nav-button" onClick={handleUsuarios}>Ver usuarios</button>
                            <button className="admin-nav-button" onClick={handleEmpleados}>Ver empleados</button>
                            <button className="admin-nav-button" onClick={handleSucursales}>Ver sucursales</button>
                            <button className="admin-nav-button" onClick={handleVentas}>Ver ventas</button>
                        </div>
                    ) : (
                        <div className='employee-elements'>
                            <h1 className="employee-nav-titulo"> Panel de empleado </h1>
                            <hr className='employee-separador' style={{ borderBlockColor: '#2bb469' }} />

                            <button className="employee-nav-button" onClick={handleLogout}>Cerrar Sesión</button>
                            <button className="employee-nav-button" onClick={loadSolicitudes}>Ver Trueques activos</button>
                            <button className="employee-nav-button" onClick={loadSolicitudesDelDia}>Ver Trueques del día</button>
                        </div>
                    )}
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
                                <th>Truequeros</th>
                            </tr>
                        </thead>
                        <tbody>
                            {solicitudes.map((solicitud) => (
                                <tr key={solicitud.id}>
                                    <td>
                                        {solicitud.publicacion_a_intercambiar.titulo}
                                    </td>
                                    <td>
                                        {solicitud.publicacion_deseada.titulo}
                                    </td>
                                    <td>{formatFechaSolicitud(solicitud.fecha_del_intercambio)}</td>
                                    <td>
                                        {solicitud.publicacion_a_intercambiar.usuario_propietario.email} - {solicitud.publicacion_deseada.usuario_propietario.email}
                                    </td>
                                    {solicitud.estado === "PENDIENTE" && (

                                        <Link href={`/tradeCheck/${solicitud.id}`}>
                                            <button className="nav-button">Gestionar Trueque</button>
                                        </Link>

                                    )}
                                    {solicitud.estado === "EXITOSA" && solicitud.venta != null && (
                                        <Link href={`adminview/Venta/${solicitud.id}`}>
                                            <button className="nav-button">Ver ventas</button>
                                        </Link>
                                    )}
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
