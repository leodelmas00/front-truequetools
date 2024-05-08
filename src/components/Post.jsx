import React, { useState, useEffect } from 'react';
import { Link, useLocation, useRoute } from 'wouter'; // Importa useRoute
import '../styles/login.css';
import '../styles/Post.css';
import 'animate.css';

function LogIn() {
    const [articulo, setArticulo] = useState('');
    const [imagen, setImagen] = useState(null);
    const [descripcion, setDescripcion] = useState('');
    const [contador, setContador] = useState(0);
    const [categoria, setCategoria] = useState('');
    const [formularioValido, setFormularioValido] = useState(false);

    useEffect(() => {
        const validarFormulario = () => {
            if (articulo.trim() !== '' && descripcion.trim() !== '' && categoria.trim() !== '') {
                setFormularioValido(true);
            } else {
                setFormularioValido(false);
            }
        };

        validarFormulario();
    }, [articulo, descripcion, categoria]);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes agregar la lógica para enviar los datos de inicio de sesión al servidor
        console.log("Artículo:", articulo);
        console.log("Imagen:", imagen);
        console.log("Descripción:", descripcion);
        console.log("Categoría:", categoria);
        // Luego puedes enviar los datos al servidor para autenticación
        // Redirigir al usuario a /SignIn
    };

    const handleImagenSeleccionada = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagen(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleEliminarImagen = () => {
        setImagen(null);
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
                            />
                        </div>   
                    </div>
                </form>
                {/* Fin del formulario de Publicación */}
            </div>
        </div>
    );
}

export default LogIn;
