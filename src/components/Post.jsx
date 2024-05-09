import React, { useState, useEffect } from 'react';
import { Redirect } from 'wouter'; // Importa useRoute
import '../styles/login.css';
import '../styles/Post.css';
import 'animate.css';
import { getAllCategorias, getAllSucursales } from '../api/trueque.api';
import axios from 'axios';
import { baseURL } from '../api/trueque.api';

function PostProduct() {
    const [form, setForm] = useState({
        titulo: '',
        descripcion: '',
        categoria: '',
        sucursal_destino: '',
        imagen: null, // Añade un estado para la imagen
    });
    const [categorias, setCategorias] = useState([]);
    const [sucursales, setSucursales] = useState([]);
    const [error, setError] = useState('');
    const [redirect, setRedirect] = useState(false); // Estado para controlar la redirección

    useEffect(() => {
        async function loadCategorias() {
            const res = await getAllCategorias()
            setCategorias(res.data)
        }

        async function loadSucursales() {
            const res = await getAllSucursales()
            setSucursales(res.data)
        }
        loadCategorias();
        loadSucursales();
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const requestData = {
                titulo: form.titulo,
                descripcion: form.descripcion,
                categoria: form.categoria,
                sucursal_destino: form.sucursal_destino,
                estado: 'PUBLICADA',
            };

            if (form.imagen) {
                requestData.imagen = form.imagen;
            }

            const response = await axios.post(baseURL + 'createPost/', requestData, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data', // Añade el tipo de contenido para FormData
                }
            });

            if (response.status === 201 && response.data.id) {
                setRedirect(true)
            } else {
                setError('Los datos ingresados no son válidos, por favor inténtelo nuevamente');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Los datos ingresados no son válidos, por favor inténtelo nuevamente');
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImagenSeleccionada = (event) => {
        const imagenSeleccionada = event.target.files[0];
        setForm(prevState => ({
            ...prevState,
            imagen: imagenSeleccionada,
        }));
    };

    if (redirect) {
        return <Redirect to="/signIn" />;
    }

    return (
        <div className="container background-img">
            <div className="form-post-container animate__animated animate__backInDown animate__slower" style={{ overflow: 'auto' }}>
                <h1 className="subtitle-post">Subir publicación</h1>
                <form onSubmit={handleSubmit} className="">
                    <div>
                        <div className="input-container">
                            <input
                                type="text"
                                name="titulo"
                                placeholder="Título"
                                value={form.titulo}
                                onChange={handleChange}
                                className="input-field-articulo input-field"
                                required
                            />
                        </div>
                        <div className="input-container">
                            <textarea
                                name="descripcion"
                                placeholder="Descripción"
                                value={form.descripcion}
                                onChange={handleChange}
                                className="input-field-descripcion"
                                rows={4}
                                maxLength={250}
                                required
                            />
                        </div>
                        <div className="input-container">
                            <select
                                name="categoria"
                                value={form.categoria}
                                onChange={handleChange}
                                className="input-field"
                                required
                            >
                                <option value="" disabled>Selecciona una categoría</option>
                                {categorias.map((categoria, index) => (
                                    <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-container">
                            <select
                                name="sucursal_destino"
                                value={form.sucursal_destino.id}
                                onChange={handleChange}
                                className="input-field"
                                required
                            >
                                <option value="" disabled>Selecciona una sucursal</option>
                                {sucursales.map((sucursal, index) => (
                                    <option key={sucursal.id} value={sucursal.id}>{sucursal.nombre}{sucursal.direccion}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-container">
                            {form.imagen ? (
                                <div className="image-preview-container">
                                    <img src={URL.createObjectURL(form.imagen)} alt="Vista previa de la imagen" className='imagen-preview' />
                                    <div className="button-container">
                                        <button
                                            type="button"
                                            onClick={() => setForm(prevState => ({ ...prevState, imagen: null }))}
                                            className="eliminar-foto-button"
                                        >
                                            Eliminar foto
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <label htmlFor="file-upload" className="custom-file-upload">
                                    Subir foto
                                    <input
                                        id="file-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImagenSeleccionada}
                                        style={{ display: 'none' }}
                                    />
                                </label>
                            )}
                        </div>


                    </div>
                    <div className="button-container">
                        <button type="submit" className="signin-post-link">
                            Publicar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PostProduct;
