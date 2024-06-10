import React, { useState, useEffect } from 'react';
import '../styles/userPosts.css'
import { Link, Redirect } from "wouter";
import { getMyPosts } from '../api/trueque.api';
import axios from 'axios';
import { formatFecha } from '../utils';

function ActivePosts({ onPostSelect, isIntercambioMode }) {
    const [estado, setEstado] = useState(null);
    const [posts, setPosts] = useState([]);
    const [redirect, setRedirect] = useState(null);

    useEffect(() => {
        loadPosts();    /*loadIntercambios(); */
        setEstado('pendiente')  /* Temporalmente lo seteo en pendiente para que aparezcan
                                    los botones, despues esto deberia eliminarse*/
    }, []);

    const loadPosts = async () => {
        const res = await getMyPosts();    /*getAllIntercambios(); */
        setPosts(res.data);                 /*setIntercambios(res.data); */
    };

    const handlePostClick = (id) => {
        setRedirect(`/post/${id}`);
    };


    if (redirect) {
        return <Redirect to={redirect} />;
    }

    const path = window.location.pathname;
    const postID = path.split('/').pop();

    return (
        <div>
            <div className='misPost-navigation-bar'>
                {posts.length > 0 ? (
                    <div>
                        {isIntercambioMode ? (
                            <div>
                                <Link to={`/post/${postID}`} className="misPost-link-volver">
                                    <button className="misPost-button">Volver</button>
                                </Link>
                                <div className="misPost-titulo">
                                    <h1>Elige el producto a intercambiar</h1>
                                    <p>Recuerda que el producto que desees ofrecer debe ser de la misma categoria que el producto que tú quieres.</p>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <Link to="/signin" className="misPost-link-volver">
                                    <button className="misPost-button">Volver</button>
                                </Link>
                                <h1>Mis publicaciones activas</h1>
                            </div>
                        )}
                        {posts.map(post => (
                            <div
                                key={post.id}
                                className="signin-post-container"
                                onClick={() => isIntercambioMode ? onPostSelect(post) : null}
                            >
                                {isIntercambioMode ? (
                                    <>
                                        <p>{formatFecha(post.fecha)}</p>
                                        <h3 className="author-signin">Autor: {post.usuario_propietario.username}</h3>
                                        <h2 className="title-signin">{post.titulo}</h2>
                                        {post.imagen && <img src={`http://127.0.0.1:8000/${post.imagen}`} alt="Imagen del post" className="post-image" />}
                                        <p>Este producto es categoria {post.categoria}</p>
                                    </>
                                ) : (
                                    <Link to={`/post/${post.id}`}>
                                        <p>{formatFecha(post.fecha)}</p>
                                        <h3 className="author-signin">Autor: {post.usuario_propietario.username}</h3>
                                        <h2 className="title-signin">{post.titulo}</h2>
                                        {post.imagen && <img src={`http://127.0.0.1:8000/${post.imagen}`} alt="Imagen del post" className="post-image" />}
                                        <p>Este producto es categoria {post.categoria}</p>
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        <Link to="/signin" className="misPost-link-volver">
                            <button className="misPost-button">Volver</button>
                        </Link>
                        <h1>Mis publicaciones activas</h1>
                        <p className="no-prods">No tienes ningún producto publicado.</p>
                    </div>
                )}
            </div>
        </div>
    );


}

export default ActivePosts;
