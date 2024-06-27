import '../styles/HistorialSolicitudes.css';
import axios from 'axios';
import { useState, useEffect } from "react";
import { baseURL } from '../api/trueque.api';

function HistorialSolicitudes() {
    const [solicitudes, setSolicitudes] = useState([]);

    useEffect(() => {
        async function loadSolicitudes() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${baseURL}mis-solicitudes/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    }
                });
                setSolicitudes(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        loadSolicitudes();
    }, []);

    return (
        <div>
            <h1>Historial de solicitudes</h1>
            <tbody>
                {solicitudes.map((solicitud) => (
                    <tr key={solicitud.id}>
                        <td>
                            Ofreciste: {solicitud.publicacion_a_intercambiar.titulo}</td>
                        <td>
                            Quieres: {solicitud.publicacion_deseada.titulo}
                        </td>
                        <td>
                            La solicitud se encuentra en: {solicitud.estado}
                        </td>
                    </tr>
                ))}
            </tbody>
        </div>
    );
}

export default HistorialSolicitudes;
