import React, { useState, useEffect } from 'react';
import { baseURL, getAllSolicitudes } from '../api/trueque.api';
import { formatFechaSolicitud } from '../utils';
import { Link } from 'wouter';
import '../styles/EmployeeView.css';

function EmployeeView() {
    const [solicitudes, setSolicitudes] = useState([]);
    const [trueques, setTrueques] = useState(false);
    const [error, setError] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('token-info');
        window.location.href = '/Login-worker';
    };

    const loadSolicitudes = async () => {
        try {
            setTrueques(true);
            const res = await getAllSolicitudes();
            setSolicitudes(res.data);
        } catch (error) {
            if (error.response && (error.response.status === 400 || error.response.status === 406 || error.response.status === 401)) {
                setError('Error al obtener el historial de solicitudes');
            }
        }
    };

    return (
        <div className="employee-panel">
            <div className="employee-navigation-bar">
                <div>
                    <h1 className="employee-nav-titulo"> Panel de empleado </h1>
                    <hr className='employee-separador'/>
                    <button className="employee-nav-button" onClick={handleLogout}>Cerrar Sesión</button>
                    <button className="employee-nav-button" onClick={loadSolicitudes}>Ver Trueques activos</button>
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
