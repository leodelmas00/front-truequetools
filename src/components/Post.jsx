import React, { useState, useEffect } from 'react';
import { Link, useLocation, useRoute } from 'wouter'; // Importa useRoute
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
    });
    const [categorias, setCategorias] = useState([]);
    const [sucursales, setSucursales] = useState([]);
    const [, push] = useRoute(); // Usa useRoute para acceder a la función push
    const [error, setError] = useState('');

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
                    Authorization: `Token ${localStorage.getItem('token')}` // Obtén el token de autenticación del almacenamiento local
                }
            });

            if (response.status === 201 && response.data.id) {
                push(`/api/post/${response.data.id}/`); // Usa la función push para redirigir
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


    return (
        <div className="container background-img">
            <div className="form-post-container animate__animated animate__backInDown animate__slower" style={{ overflow: 'auto' }}>
                <h1 className="subtitle-post">Subir publicación</h1>

                {/* Formulario de Publicación */}
                <form onSubmit={handleSubmit} className="">
                    <div>
                        <button className="signin-post-link">
                            Publicar
                        </button>
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
                {/* Fin del formulario de Publicación */}
            </div>
        </div>
    );
}

export default PostProduct;
