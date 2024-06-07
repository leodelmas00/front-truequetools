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
    return (
        <div>
            {posts.length > 0 ? (
                <>
                    {isIntercambioMode ? (
                        <div>
                            <h1 className="titulo">Elige el producto a intercambiar</h1>
                            <p>* Recuerda que el producto que desees ofrecer debe ser de la misma categoria que el producto que tú quieres.</p>
                        </div>
                    ) : (
                        <h1 className="titulo">Mis publicaciones activas</h1>
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
                </>
            ) : (
                <p className="no-prods">No tienes ningún producto publicado.</p>
            )}
        </div>
    );


}

export default ActivePosts;