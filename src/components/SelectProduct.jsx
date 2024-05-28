import React, { useState } from 'react';
import { useParams } from 'wouter';
import axios from 'axios';
import UserPosts from './UserPosts';
import '../styles/SelectProduct.css';
import { baseURL } from '../api/trueque.api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Intercambiar() {
    const { id: publicacionDeseadaId } = useParams();
    const [selectedPost, setSelectedPost] = useState(null);
    const [intercambioSuccess, setIntercambioSuccess] = useState(false);

    console.log('ID de la publicación deseada:', publicacionDeseadaId); // Agrega el console.log aquí


    const handlePostSelect = (post) => {
        setSelectedPost(post);
    };

    const handleIntercambioSubmit = async () => {
        if (!selectedPost) {
            toast.warn('Selecciona una publicación para intercambiar.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(baseURL + 'create-solicitud/', {
                publicacion_deseada: publicacionDeseadaId,
                publicacion_a_intercambiar: selectedPost.id,
            }, {
                headers: {
                    Authorization: `Token ${token}`,
                }
            });

            console.log(response.data);

            if (response.status === 201 && response.data) {
                setIntercambioSuccess(true);
                toast.success('Intercambio solicitado con éxito.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            console.log("ERROR", error.response.status)

            console.error('Error al crear la solicitud de intercambio:', error);
            if (error.response) {
                console.log('Error response data:', error.response.data);
                console.log('Error response status:', error.response.status);
                console.log("ERROR", error.response.status)


                if (error.response.status === 400) {
                    toast.error('Debes elegir un producto de la misma categoría que el original.', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    toast.error('Hubo un error al intentar crear la solicitud de intercambio.', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            } else {
                toast.error('No se pudo conectar con el servidor.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    };

    return (
        <div className="intercambiar-container">
            <UserPosts onPostSelect={handlePostSelect} isIntercambioMode={true} />
            {selectedPost && (
                <div>
                    <h2 className="selected-title">Has seleccionado: {selectedPost.titulo}</h2>
                    <button onClick={handleIntercambioSubmit} className="intercambio-button">Solicitar Intercambio</button>
                </div>
            )}
            {intercambioSuccess && <p className="success-message">La solicitud de intercambio se envió correctamente.</p>}
        </div>
    );
}

export default Intercambiar;
