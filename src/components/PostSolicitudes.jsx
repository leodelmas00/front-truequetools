import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "wouter";
import { baseURL } from "../api/trueque.api";
import { formatFechaHistorial, formatFechaSolicitud } from "../utils";
import '../styles/PostSolicitudes.css'


function PostSolicitudes() {
    const [solicitudes, setSolicitudes] = useState([]);
    const [detallesPublicaciones, setDetallesPublicaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();

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

    useEffect(() => {
        const obtenerDetallesPublicacion = async (publicacionId) => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${baseURL}post/${publicacionId}`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    }
                });
                return response.data;
            } catch (error) {
                console.error('Error al obtener detalles de la publicación:', error);
                return null;
            }
        };

        const obtenerDetallesParaTodasLasSolicitudes = async () => {
            const detalles = await Promise.all(solicitudes.map(async (solicitud) => {
                return obtenerDetallesPublicacion(solicitud.publicacion_a_intercambiar);
            }));
            setDetallesPublicaciones(detalles);
        };

        obtenerDetallesParaTodasLasSolicitudes();
    }, [solicitudes]);

    const handleAceptar = async (solicitudId) => {
        try {
            const token = localStorage.getItem('token');
            console.log(`Enviando solicitud PATCH a ${baseURL}solicitudes/${solicitudId}/`);
            await axios.patch(`${baseURL}solicitudes/${solicitudId}/`, { estado: 'PENDIENTE' }, {
                headers: {
                    Authorization: `Token ${token}`,
                }
            });
            console.log('Solicitud PATCH enviada correctamente');
            const nuevasSolicitudes = solicitudes.filter(solicitud => solicitud.id !== solicitudId);
            setSolicitudes(nuevasSolicitudes);
        } catch (error) {
            console.error('Error al aceptar la solicitud:', error);
        }
    };



    return (
        <div className="post-solicitudes-container"> {/* Agrega la clase CSS al contenedor principal */}
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <div>
                    {solicitudes.length === 0 ? ( /* Verifica si no hay solicitudes */
                        <p className="no-solicitudes-message">No hay solicitudes de intercambio.</p> /* Muestra un mensaje si no hay solicitudes */
                    ) : (
                        solicitudes.map((solicitud, index) => (
                            <div key={solicitud.id} className="solicitud"> {/* Cambia li a div y agrega la clase CSS */}
                                <p>Recibida el {formatFechaHistorial(solicitud.fecha)}</p>

                                {detallesPublicaciones[index] && (
                                    <div>
                                        <p>
                                            {detallesPublicaciones[index].imagen && (
                                                <div>
                                                    <p>Imagen del producto:</p>
                                                    <img className="preview-img" src={`http://127.0.0.1:8000/${detallesPublicaciones[index].imagen}/`} alt="imagen del post" />
                                                </div>
                                            )}
                                            {detallesPublicaciones[index].usuario_propietario.username} te ofreció intercambiar su{' '}
                                            <a href={`http://localhost:3000/post/${detallesPublicaciones[index].id}/`} className="enlace-clickeable">
                                                {detallesPublicaciones[index].titulo}
                                            </a>
                                            <h4>Fecha y horario: {formatFechaSolicitud(solicitud.fecha_del_intercambio)}</h4>

                                            <h5>* Recuerda: si te interesa el producto pero no puedes asistir en el horario proporcionado, puedes
                                                rechazar la solicitud y crear una nueva con otro horario en la publicación del producto deseado!
                                            </h5>

                                        </p>

                                        <div>
                                            <button className="btn-aceptar" onClick={() => handleAceptar(solicitud.id)}>Aceptar</button> {/* Agrega clases para botón de aceptar */}
                                            <button className="btn-rechazar">Rechazar</button> {/* Agrega clases para botón de rechazar */}
                                        </div>
                                    </div>
                                )}

                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default PostSolicitudes;
