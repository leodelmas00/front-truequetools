import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatFechaSolicitud } from '../utils';
import '../styles/EmployeeView.css';
import { baseURL } from '../api/trueque.api';

function EmployeeView() {
    const [solicitudes, setSolicitudes] = useState([]);
    const [trueques, setTrueques] = useState(false);
    const [error, setError] = useState(null);

    const handleLogout = () => {
        localStorage.setItem('loggedIn', false)
        localStorage.setItem('userEmail', '')
        window.location.href = '/Login-worker';
    };

    const loadSolicitudes = async () => {
        try {
            const loggedIn = localStorage.getItem('loggedIn');
            const userEmail = localStorage.getItem('userEmail'); // Obtener el email del localStorage
            if (loggedIn) {
                try {
                    console.log(`${baseURL}employee/solicitudes/`)
                    const response = await axios.get(`${baseURL}employee/solicitudes/`, {
                        headers: {
                            'X-User-Email': userEmail
                        }
                    });
                    console.log(response.data)
                    setSolicitudes(response.data)
                    return response.data;
                } catch (error) {
                    console.error('Error en la solicitud:', error);
                    throw error;
                }
            } else {
                alert('Debes iniciar sesión');
                window.location.href = '/Login-worker';
            }
        } catch (error) {
            if (error.response && (error.response.status === 400 || error.response.status === 406 || error.response.status === 401)) {
                console.error('Error al obtener el historial de solicitudes:', error);
                throw error;
            } else {
                console.error('Error desconocido:', error);
                throw error;
            }
        }
    };


    return (
        <div className="employee-panel">
            <div className="employee-navigation-bar">
                <div>
                    <h1 className="employee-nav-titulo"> Panel de empleado </h1>
                    <hr className='employee-separador' />
                    <button className="employee-nav-button" onClick={handleLogout}>Cerrar Sesión</button>
                    <button className="employee-nav-button" onClick={loadSolicitudes}>Ver Trueques activos</button>
                    <Link to="/tradeCheck">
                        <button className="employee-nav-button" onClick={loadSolicitudes}>Revisar Trueque</button>
                    </Link>
                </div>
            </div>
            <div className="employee-elements">
                {trueques && trueques === true && (
                    <table className="employee-table">
                        <thead>
                            <tr>
                                <th>Usuario 1</th>
                                <th>1er Articulo</th>
                                <th>Usuario 2</th>
                                <th>2do Articulo</th>
                                <th>Fecha del Intercambio</th>
                                <th>Sucursal</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {solicitudes.map(solicitud => (
                                <tr key={solicitud.id}>
                                    <td> usuario1 </td>
                                    <td> 1er articulo </td>
                                    <td> usuario2 </td>
                                    <td> 2do articulo </td>
                                    <td>{formatFechaSolicitud(solicitud.fecha_del_intercambio)}</td>
                                    <td> sucursal </td>
                                    <td>{solicitud.estado}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default EmployeeView;