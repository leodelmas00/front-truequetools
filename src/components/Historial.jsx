import React, { useState, useEffect } from 'react';
import '../styles/Historial.css';
import { Link } from "wouter";
import { baseURL, getAllPosts } from '../api/trueque.api';
import axios from 'axios';
import { formatFechaHistorial } from '../utils';

function Historial() {
    const [estado, setEstado] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        loadPosts();    /*loadIntercambios(); */
        setEstado('pendiente')  /* Temporalmente lo seteo en pendiente para que aparezcan
                                    los botones, despues esto deberia eliminarse*/
    }, []);

    const loadPosts = async () => {
        const res = await getAllPosts();    /*getAllIntercambios(); */
        setPosts(res.data);                 /*setIntercambios(res.data); */
    };

    const handleDelete = async (postid) => {
        try {
            const response = await axios.post(baseURL + 'deleteIntercambio/', {postid}, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    /* ------------------------------------------
     NOTA: Historial todavia no esta terminado,
     falta Fetchear las cosas del Intercambio real,
     lo que hice por ahora es Fetchear la informacion de TODAS las publicaciones,
     como para ya tener el esqueleto.
     ACLARACIONES:
     - Muchas cosas de las que estan comentadas representan el
       como DEBERIA ser cuando gero termine el back ;)
     - <tr> = table_row
     - <th> = table_header
     ------------------------------------------*/

    return (
        <div className='Historial'>
            <h1 className='Titulo'> HISTORIAL </h1>
            <hr className='separador'></hr>
            <div className='Historial-box'>
                <table>
                    <thead>
                        <tr>
                            <th>Mi Articulo</th>
                            <th>Su Articulo</th>
                            <th>Fecha</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(post => (
                            <tr key={post.id}>
                                <td ><Link className='link' to={`/post/${post.id}`}>{post.titulo}</Link></td>
                                <td ><Link className='link' to={`/post/${post.id}`}>{post.titulo}</Link></td>
                                <td>{formatFechaHistorial(post.fecha)}</td>
                                <td>Estado</td>
                                {estado === "pendiente" && (
                                    <button className='boton-cancelar' onClick={() => handleDelete(post.id)}>Cancelar</button>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Historial;
