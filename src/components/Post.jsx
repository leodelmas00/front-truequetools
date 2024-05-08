import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import '../styles/login.css';
import '../styles/Post.css';
import 'animate.css';

function Post() {
    const [articulo, setArticulo] = useState('');
    const [imagen, setImagen] = useState(null);
    const [descripcion, setDescripcion] = useState('');
    const [contador, setContador] = useState(0);
    const [categoria, setCategoria] = useState('');
    const [sucursal, setSucursal] = useState('');
    const [formularioValido, setFormularioValido] = useState(false);

    useEffect(() => {
        const validarFormulario = () => {
            if (articulo.trim() !== '' && descripcion.trim() !== '' && categoria.trim() !== '' && sucursal.trim() !== '') {
                setFormularioValido(true);
            } else {
                setFormularioValido(false);
            }
        };

        validarFormulario();
    }, [articulo, descripcion, categoria, sucursal]);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes agregar la lógica para enviar los datos de inicio de sesión al servidor
        console.log("Artículo:", articulo);
        console.log("Imagen:", imagen);
        console.log("Descripción:", descripcion);
        console.log("Categoría:", categoria);
        console.log("Sucursal:", sucursal);
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

    const handleArticuloChange = (e) => {
        const { value } = e.target;
        setArticulo(value);
    };

    const handleDescripcionChange = (e) => {
        const { value } = e.target;
        if (value.length <= 250) {
            setDescripcion(value);
            setContador(value.length);
        }
    };

    const handleCategoriaChange = (e) => {
        const { value } = e.target;
        setCategoria(value);
    };

    const handleSucursalChange = (e) => {
        const { value } = e.target;
        setSucursal(value);
    };

    // Array de sucursales (puedes cambiarlo según tus necesidades)
    const sucursales = ['Sucursal A', 'Sucursal B', 'Sucursal C'];

    return (
        <div className="container background-img">
            <div className="form-post-container animate__animated animate__backInDown animate__slower" style={{overflow: 'auto'}}>
                <h1 className="subtitle-post">Subir publicación</h1>

                {/* Formulario de Publicación */}
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
                            <button onClick={handleEliminarImagen} className="eliminar-imagen-button">
                                Eliminar imagen
                            </button>
                        )}

                        <Link to="/SignIn" className="post-link">
                            <button className={formularioValido ? "signin-post-link" : "signin-post-link-disabled"} disabled={!formularioValido}>
                                Publicar
                            </button>
                        </Link>

                        {imagen && (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1em', marginBottom: '2em'}}>
                                <img src={imagen} alt="Imagen seleccionada" style={{ maxWidth: '40%', maxHeight: '10em' }} />
                            </div>
                        )}

                        <div className="input-container">
                            <input
                                type="text"
                                name="articulo"
                                placeholder="Artículo"
                                value={articulo}
                                onChange={handleArticuloChange}
                                className="input-field-articulo input-field"
                                required
                            />
                        </div> 

                        <div className="input-container">
                            <textarea
                                name="descripcion"
                                placeholder="Descripción"
                                value={descripcion}
                                onChange={handleDescripcionChange}
                                className="input-field-descripcion"
                                rows={4}
                                maxLength={250}
                                required
                            />
                            <div className="contador-caracteres">
                                {contador} / 250
                            </div>
                        </div>   

                        <div className="input-container">
                            <input
                                type="text"
                                name="categoria"
                                placeholder="Categoría"
                                value={categoria}
                                onChange={handleCategoriaChange}
                                className="input-field"
                                required
                            />
                        </div>  

                        <div className="input-container">
                            <select
                                name="sucursal"
                                value={sucursal}
                                onChange={handleSucursalChange}
                                className="input-field"
                                required
                            >
                                <option value="" disabled>Elige una sucursal</option>
                                {sucursales.map((sucursal, index) => (
                                    <option key={index} value={sucursal}>{sucursal}</option>
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

export default Post;
