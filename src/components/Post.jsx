import React, { useState, useEffect } from 'react';
import { Redirect } from 'wouter'; // Importa useRoute
import '../styles/login.css';
import '../styles/Post.css';
import 'animate.css';
import { getAllCategorias, getAllSucursales } from '../api/trueque.api';
import axios from 'axios';
import { baseURL } from '../api/trueque.api';
import { redirect } from 'react-router-dom';

function PostProduct() {
    const [form, setForm] = useState({
        titulo: '',
        descripcion: '',
        categoria: '',
        sucursal_destino: '',
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
            const response = await axios.post(baseURL + 'createPost/', form, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
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
    if (redirect) {
        return <Redirect to="/signIn" />;
    }

    return (
        <div className="container background-img">
            <div className="form-post-container animate__animated animate__backInDown animate__slower" style={{ overflow: 'auto' }}>
                <h1 className="subtitle-post">Subir publicación</h1>
                <button type="submit" className="signin-post-link">
                    Publicar
                </button>
                <form onSubmit={handleSubmit} className="">
                    <div>
                        <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImagenSeleccionada}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="file-upload" className="custom-file-upload">
                            Subir foto
                        </label>
                        {imagen && (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1em', marginBottom: '2em' }}>
                                <img src={imagen} alt="Imagen seleccionada" style={{ maxWidth: '40%', maxHeight: '10em' }} />
                            </div>
                        )}
    
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
    
                    </div>
                </form>
            </div>
        </div>
    );
    
}

export default PostProduct;
