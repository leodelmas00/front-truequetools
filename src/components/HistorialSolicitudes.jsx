import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../api/trueque.api';
import { IoChevronBackCircle } from 'react-icons/io5'; 
import '../styles/HistorialSolicitudes.css';
import 'animate.css';
import 'animate.css/animate.min.css';


function HistorialSolicitudes() {
    const [solicitudes, setSolicitudes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadSolicitudes() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${baseURL}mis-solicitudes/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                setSolicitudes(response.data);
            } catch (error) {
                setError('Error al cargar las solicitudes');
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        }

        loadSolicitudes();
    }, []);

    const handleGoBack = () => {
        window.history.back(); // Redirige a la página anterior en el historial del navegador
    };

    if (loading) {
        return <div className="loading">Cargando...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="background-container">
            <button className="volver-btn" onClick={handleGoBack}>
                <IoChevronBackCircle size={25} />
                Volver
            </button>
            <div className="historial-container animate__animated animate__rotateIn">
                <h1 className="historial-title">Historial de solicitudes</h1>
                <table className="historial-table">
                    <thead>
                        <tr>
                            <th>Ofreciste</th>
                            <th>Quieres</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {solicitudes.map((solicitud) => (
                            <tr key={solicitud.id}>
                                <td>{solicitud.publicacion_a_intercambiar.titulo}</td>
                                <td>{solicitud.publicacion_deseada.titulo}</td>
                                <td>{solicitud.estado}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default HistorialSolicitudes;
