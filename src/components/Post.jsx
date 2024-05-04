import React, { useState } from 'react';
import { Link } from 'wouter';
import '../styles/login.css';
import '../styles/Post.css';
import 'animate.css';

function LogIn() {
    const [articulo, setArticulo] = useState('');
    const [imagen, setImagen] = useState(null);
    const [descripcion, setDescripcion] = useState('');
    const [contador, setContador] = useState(0);
    const [categoria, setCategoria] = useState('');
    const [inputsCompletos, setInputsCompletos] = useState(false);

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

    const handleArticuloChange = (e) => {
        const { value } = e.target;
        setArticulo(value);
        checkInputs();
    };

    const handleDescripcionChange = (e) => {
        const { value } = e.target;
        if (value.length <= 250) {
            setDescripcion(value);
            setContador(value.length);
            checkInputs();
        }
    };

    const handleCategoriaChange = (e) => {
        const { value } = e.target;
        setCategoria(value);
        checkInputs();
    };

    const checkInputs = () => {
        const articuloCompleto = articulo.trim().length > 0;
        const descripcionCompleta = descripcion.trim().length > 0;
        const categoriaCompleta = categoria.trim().length > 0;
        const inputsCompleted = articuloCompleto && descripcionCompleta && categoriaCompleta;
        setInputsCompletos(inputsCompleted);
    };

    return (
        <div className="container background-img">
            <div className="form-post-container animate__animated animate__backInDown animate__slower" style={{overflow: 'auto'}}>
                <h1 className="subtitle-post">Subir publicación</h1>
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

                        {inputsCompletos && (
                            <Link to="/SignIn" className="post-link">
                                <button className="signin-post-link">Publicar</button>
                            </Link>
                        )}

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
                                className="input-field"
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
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LogIn;
