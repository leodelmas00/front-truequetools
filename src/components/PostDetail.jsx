import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../api/trueque.api';
import { useParams, Link, useLocation } from "wouter";
import { getUserInfo } from '../api/trueque.api';
import CommentList from './CommentList';
import '../styles/PostDetailStyle.css';
import { formatFecha } from '../utils';
import * as FaIcons from "react-icons/fa";
import * as MDIcons from "react-icons/md";
import { MdOutlineStarBorderPurple500 } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaMoneyCheck } from "react-icons/fa";
import { TbReportMoney } from "react-icons/tb";
import 'animate.css';
import 'animate.css/animate.min.css';
import { URL_IMAGES } from '../api/trueque.api';

function PostDetail() {
    const [post, setPost] = useState(null);
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [nuevoComentario, setNuevoComentario] = useState('');
    const [comments, setComments] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [location, setLocation] = useLocation();
    const [sucursal, setSucursal] = useState(null);
    const [timeLeft, setTimeLeft] = useState('');


    useEffect(() => {
        const fetchPostAndComments = async () => {
            try {
                const token = localStorage.getItem('token');
                const postResponse = await axios.get(`${baseURL}post/${params.postId}/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    }
                });
                const userInfoResponse = await getUserInfo();
                setUserInfo(userInfoResponse.data);
                setPost(postResponse.data);

                const sucursalResponse = await axios.get(`${baseURL}sucursal/${postResponse.data.sucursal_destino.id}/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    }
                });
                setSucursal(sucursalResponse.data);

                const commentsResponse = await axios.get(`${baseURL}post/${params.postId}/comments_list/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    }
                });
                setComments(commentsResponse.data);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPostAndComments();
    }, [params.postId]);

    useEffect(() => {
        if (post && post.fecha_fin_promocion) {
            const calculateTimeLeft = () => {
                const now = new Date();
                const endDate = new Date(post.fecha_fin_promocion);
                const difference = endDate - now;

                if (difference > 0) {
                    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                    // Función para agregar un cero delante si el número es menor que 10
                    const formatNumber = (number) => {
                        return number.toString().padStart(2, '0');
                    };

                    setTimeLeft(`${days} dias ${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`);
                } else {
                    setTimeLeft('La promoción ha terminado');
                }
            };

            calculateTimeLeft();
            const interval = setInterval(calculateTimeLeft, 1000); // Actualiza cada segundo

            return () => clearInterval(interval);
        }
    }, [post]);


    const handleInputChange = (event) => {
        setNuevoComentario(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (nuevoComentario.trim() === '') {
            setErrorMessage('No es posible publicar una pregunta vacía');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseURL}post/${params.postId}/comments/`, {
                contenido: nuevoComentario
            }, {
                headers: {
                    Authorization: `Token ${token}`,
                }
            });
            if (response.status === 201 && response.data) {
                setComments(prevComments => [...prevComments, response.data]);
                setNuevoComentario('');
                setErrorMessage('');
            }
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message || 'Algo salió mal');
        }
    };

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

    const handleIntercambiar = (postId) => {
        setLocation(`/SelectProduct/${postId}`);
    };

    const handleDelete = async () => {
        if (window.confirm("¿Estás seguro de que quieres eliminar esta publicación?")) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(
                    `${baseURL}mis-publicaciones/${params.postId}/`,
                    {
                        headers: {
                            Authorization: `Token ${token}`,
                        }
                    }
                );
                setLocation(`/signIn`);
                console.log("Publicación eliminada");
            } catch (error) {
                console.log("Error", error.status)
            }
        };

    }

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="background-image-published">
            {post.fecha_fin_promocion && (
                <div className="highlighted-message animate__animated animate__flip animate__delay-2s">
                    <TbReportMoney size={25} />
                    <span style={{ marginLeft: '5px', marginRight: '5px' }}>Publicación destacada</span>
                    <TbReportMoney size={25} />
                </div>

            )}

            <div className="post-container-detail">
                <div className="post-card">
                    <p className="post-date">{formatFecha(post.fecha)}</p>
                    <h5>Sucursal destino: {sucursal ? `${sucursal.nombre} - ${sucursal.direccion}` : 'Cargando...'}</h5>

                    {post.imagen && <img src={`${URL_IMAGES}${post.usuario_propietario.avatar}`} alt="Imagen de perfil" className='profile-picture-detail' />}
                    <hr />
                    <h3>Subido por: {post.usuario_propietario.username} - <MdOutlineStarBorderPurple500 /> {post.usuario_propietario.reputacion} pts.</h3>
                    {console.log(post.usuario_propietario.avatar, "HOLAA")}
                    <h1 className="post-title">{post.titulo}</h1>
                    <p className="post-description">{post.descripcion}</p>
                    {post.imagen && <img src={`${URL_IMAGES}${post.imagen}`} alt="Imagen del post" className='imagen-preview-detail' />}
                    <h5>Este producto pertenece a la categoria {post.categoria}</h5>
                    {userInfo && userInfo.id === post.usuario_propietario.id && (
                        <div>
                            <Link to={`/Post/${params.postId}/solicitudes`}>
                                <button className="solicitudes-btn post-card-btn">Ver solicitudes recibidas<FaIcons.FaBell style={{ marginLeft: '10px' }}></FaIcons.FaBell></button>
                            </Link>
                            {post.fecha_fin_promocion === null && (
                                <Link to={`/HighlightPost/${params.postId}`}>
                                    <button className="highlight-btn">Destacar <FaMoneyCheck className="icon-highlight" /></button>
                                </Link>
                            )}
                            <button className="delete-btn" onClick={handleDelete}><FaRegTrashAlt /> Eliminar</button>
                        </div>
                    )}
                </div>
                {userInfo && userInfo.id === post.usuario_propietario.id && post.fecha_fin_promocion != null && (
                    <div className="promotion-timer animate__animated animate__pulse" style={{ animationDelay: '4s' }}>
                        {post.fecha_fin_promocion ? (
                            <p>La promoción de tu publicación {timeLeft === 'La promoción ha terminado' ? 'se venció' : `vence en: ${timeLeft}`}</p>
                        ) : null}
                    </div>
                )}

                <div className='botones'>
                    <Link to="/Signin">
                        <button> <MDIcons.MdArrowCircleLeft size={15} /> Volver al inicio</button>
                    </Link>
                    {userInfo && userInfo.id !== post.usuario_propietario.id && (
                        <button onClick={() => handleIntercambiar(post.id)}>Intercambiar <FaIcons.FaExchangeAlt size={15} /></button>
                    )}
                </div>
                <div className="post-comments">
                    <h2><FaIcons.FaComments /> Comentarios: </h2>
                    <CommentList
                        comments={comments}
                        postId={params.postId}
                        userInfo={userInfo}
                        updateComments={updateComments}
                        deleteComment={deleteComment}
                        postOwnerId={post.usuario_propietario.id}
                        post={post}
                    />
                </div>
                <div className='comentar'>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="text"
                                value={nuevoComentario}
                                onChange={handleInputChange}
                                placeholder="Escribe un comentario..."
                                className="input-field-comment"
                                maxLength={200}
                            />
                        </div>
                        <button type="submit" className="comment-button">Enviar</button>
                        <p>Caracteres ingresados: {nuevoComentario.length}/200</p>
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PostDetail;
