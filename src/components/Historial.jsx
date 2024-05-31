// Historial.js
import React, { useState, useEffect } from 'react';
import '../styles/Historial.css';
import { baseURL } from '../api/trueque.api';
import axios from 'axios';
import { formatFechaSolicitud } from '../utils';
import PostDetailHistory from './PostDetailHistory';

function Historial() {
    const [solicitudesConSucursal, setSolicitudesConSucursal] = useState([]);
    const [error, setError] = useState(null);

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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Historial;
