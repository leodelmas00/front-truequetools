import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../api/trueque.api';
import { useParams, Link, useLocation } from "wouter";
import CommentList from './CommentList';
import '../styles/PostDetailStyle.css';
import { formatFecha } from '../utils';
import * as FaIcons from "react-icons/fa";
import * as MDIcons from "react-icons/md";
import { MdOutlineStarBorderPurple500 } from "react-icons/md";


function PostDetail() {
    const [post, setPost] = useState(null);
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [comments, setComments] = useState([]);
    const [openError, setOpenError] = useState('')
    const [userInfo, setUserInfo] = useState('')


    useEffect(() => {
        const fetchPostAndComments = async () => {
            try {
                const userInfo = {
                    email: "admin@truequetools.com",
                    fecha_de_nacimiento: null,
                    is_staff: true,
                    reputacion: 0,
                    sucursal_favorita: {},
                    username: "admin",
                };
                setUserInfo(userInfo)
                const loggedIn = localStorage.getItem('loggedIn');
                const userEmail = localStorage.getItem('userEmail'); // Obtener el email del localStorage
                const isAdmin = localStorage.getItem('isAdmin')
                if (loggedIn === 'true' && isAdmin === 'true') {
                    try {
                        console.log(`${baseURL}admin/publicaciones/`);
                        const response = await axios.get(`${baseURL}post-admin/${params.postId}/`, {
                            headers: {
                                'X-User-Email': userEmail
                            }
                        });
                        console.log(response.data);
                        setPost(response.data);
                        const commentsResponse = await axios.get(`${baseURL}post-admin/${params.postId}/comments/`, {
                            headers: {
                                'X-User-Email': userEmail
                            }
                        });
                        setComments(commentsResponse.data);
                    } catch (error) {
                        console.error('Error en la publicacion:', error);
                        setErrorMessage('Error al obtener las publicaciones.');
                        setOpenError(true);
                    }
                } else {
                    setErrorMessage('Debes iniciar sesión para ver las publicaciones.');
                    setOpenError(true);
                    setTimeout(() => {
                        window.location.href = '/Login-worker';
                    }, 1500);
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPostAndComments();
    }, [params.postId]);


    const updateComments = (comentarioId, respuesta) => {
        setComments(prevComments =>
            prevComments.map(comment =>
                comment.id === comentarioId ? { ...comment, respuesta } : comment
            )
        );
    };

    const deleteComment = (comentarioId) => {
        setComments(prevComments =>
            prevComments.filter(comment =>
                comment.id !== comentarioId
            )
        );
    };

    if (loading) {
        return <div>Cargando...</div>;
    }
    console.log('userInfo:', userInfo);

    return (
        <div className="background-image-published">
            <div className="post-container-detail">
                <div className="post-card">
                    <p className="post-date">{formatFecha(post.fecha)}</p>
                    <hr />
                    <h3>Subido por: {post.usuario_propietario.username} - <MdOutlineStarBorderPurple500 /> {post.usuario_propietario.reputacion} pts.</h3>
                    <h1 className="post-title">{post.titulo}</h1>
                    <p className="post-description">{post.descripcion}</p>
                    {post.imagen && <img src={`http://127.0.0.1:8000${post.imagen}`} alt="Imagen del post" className='imagen-preview-detail' />}
                    <h5>Este producto pertenece a la categoria {post.categoria}</h5>

                </div>
                <div className='botones'>
                    <Link to="/PostList">
                        <button> <MDIcons.MdArrowCircleLeft size={15} /> Volver al inicio</button>
                    </Link>

                </div>
                <div className="post-comments">
                    <h2><FaIcons.FaComments /> Comentarios: </h2>
                    <CommentList
                        comments={comments}
                        postId={params.postId}
                        updateComments={updateComments}
                        deleteComment={deleteComment}
                        userInfo={userInfo}
                        postOwnerId={post.usuario_propietario.id}
                    />
                </div>
            </div>
        </div>
    );
}

export default PostDetail;
