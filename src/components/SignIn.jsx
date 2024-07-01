import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../styles/home.css';
import 'animate.css';
import logoImg from '../logo_1/logo_1_sinfondo.png';
import userNoProfilePicture from '../logo_1/userNoProfilePicture.jpg';
import { Link, Redirect } from 'wouter';
import { baseURL, getAllPosts } from '../api/trueque.api';
import * as FaIcons from "react-icons/fa";
import { formatFecha } from '../utils';
import { MdOutlineStarBorderPurple500 } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { FaEye } from "react-icons/fa";

function SignIn() {
    const [menuOpen, setMenuOpen] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const postsContainerRef = useRef(null);
    const [isStaff, setIsStaff] = useState(false);
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [posts, setPosts] = useState([]);
    const [redirect, setRedirect] = useState(null);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [user, setUser] = useState({});
    const [showNotifications, setShowNotifications] = useState(false);
    const [notificationCount, setNotificationCount] = useState(0);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetchUserInfo();
        loadPosts();
        fetchNotifications(); // Cargar las notificaciones al inicio
    }, []);

    const fetchUserInfo = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseURL}user-info/`, {
                headers: {
                    Authorization: `Token ${token}`,
                }
            });
            setIsStaff(response.data.is_staff);
            setUser(response.data)
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
        if (postsContainerRef.current) {
            if (menuOpen) {
                postsContainerRef.current.classList.add('shifted');
            } else {
                postsContainerRef.current.classList.remove('shifted');
            }
        }
    };

    const handleLogoClick = (event) => {
        event.preventDefault();
        window.location.reload();
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('token-info');
        setIsLoggedIn(false);
        window.location.href = '/Login';
    };

    const loadPosts = async () => {
        try {
            const res = await getAllPosts();
            setPosts(res.data);
        } catch (error) {
            window.location.href = '/Login';
        }
    };

    const handlePostClick = (id) => {
        setRedirect(`/post/${id}`);
    };

    const handleSearchChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        setSearchPerformed(true);
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get(`${baseURL}search-posts/`, {
                headers: {
                    Authorization: `Token ${token}`
                },
                params: { q: query }
            });
            setSearchResults(response.data);
            console.log("DATA:", searchResults)
        } catch (error) {
            console.error('Error during search:', error);
        }
    };

    const handleNotificationsClick = () => {
        setShowNotifications(!showNotifications);
    };

    const fetchNotifications = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseURL}mis-notificaciones/`, {
                headers: {
                    Authorization: `Token ${token}`,
                }
            });
            setNotifications(response.data);
            const unreadNotifications = response.data.filter(notification => !notification.leida);
            setNotificationCount(unreadNotifications.length);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const handleReadNotification = async (notificationId, currentStatus) => {
        try {
            const token = localStorage.getItem('token');
            const newStatus = !currentStatus;
            await axios.patch(
                `${baseURL}mis-notificaciones/${notificationId}/`, { leida: newStatus },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    }
                }
            );

            // Actualizar localmente el estado de la notificación
            const updatedNotifications = notifications.map(notification => {
                if (notification.id === notificationId) {
                    return { ...notification, leida: newStatus };
                }
                return notification;
            });

            setNotifications(updatedNotifications);

            // Actualizar el contador de notificaciones
            if (newStatus) {
                setNotificationCount(prevCount => prevCount - 1);
            } else {
                setNotificationCount(prevCount => prevCount + 1);
            }
        } catch (error) {
            console.error('Error marking notification as read/unread:', error);
        }
    };

    if (redirect) {
        return <Redirect to={redirect} />;
    }

    return (
        <div className="backgroundHome">
            <div className="navigation-bar">
                <FaIcons.FaBars className="menu-button" onClick={handleMenuToggle} />
                <div className='search-box'>
                    <input
                        className='search-input'
                        placeholder="¿Qué estás buscando?"
                        type="text"
                        value={query}
                        onChange={handleSearchChange}
                    />
                    <button className='search-button' onClick={handleSearchSubmit}>Buscar</button>
                </div>
                <div>
                    <Link to="/Post" className="post-link">
                        <button className="publicar-button">Publicar producto</button>
                    </Link>
                    <button className="notification-bn" onClick={handleNotificationsClick}>
                        <IoIosNotifications size={30} />
                        {notificationCount > 0 && <span className="notification-count">{notificationCount}</span>}
                    </button>
                </div>

                <div className='notification-container'>
                    {showNotifications && (
                        <div className="notifications-container">
                            {/* Contenido del contenedor de notificaciones */}
                            {notifications.map(notification => (
                                <div key={notification.id} className={`notification-item ${notification.leida ? 'read' : 'unread'}`}>
                                    <p>{notification.contenido}</p>
                                    <button
                                        className={`read-btn ${notification.leida ? 'read' : ''}`}
                                        onClick={() => handleReadNotification(notification.id, notification.leida)}
                                    >
                                        <FaEye />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <a href="/" onClick={handleLogoClick}>
                    <img src={logoImg} alt="Logo" className="logo" />
                </a>
            </div>

            <br />
            <div>
                <h1> . </h1>
            </div>
            <div className='separate-div'></div>

            <div className={`posts-container ${menuOpen ? 'shifted' : ''}`} ref={postsContainerRef}>
                {searchPerformed ? (
                    searchResults.length === 0 ? (
                        <h1 className='no-results'>No hay resultados para la búsqueda</h1>
                    ) : (
                        searchResults.map(post => (
                            <Link key={post.id} to={`/post/${post.id}`} onClick={() => handlePostClick(post.id)}>
                                <div className="signin-post-container">
                                    <p>{formatFecha(post.fecha)}</p>
                                    <h3 className="author-signin">
                                        <h3>Autor: {post.usuario_propietario.username} - <MdOutlineStarBorderPurple500 /> {post.usuario_propietario.reputacion} pts.</h3>
                                    </h3>
                                    <h2 className="title-signin">
                                        {post.titulo}
                                    </h2>
                                    {console.log(post.imagen)}
                                    {post.imagen && <img src={`http://127.0.0.1:8000/${post.imagen}/`} alt="Imagen del post" className="post-image" />}
                                    <p>{Object.keys(post.comentarios).length} comentario(s)</p>
                                </div>
                            </Link>
                        ))
                    )
                ) : (
                    posts.map(post => (
                        <Link key={post.id} to={`/post/${post.id}`} onClick={() => handlePostClick(post.id)}>
                            <div className="signin-post-container">
                                <p>{formatFecha(post.fecha)}</p>

                                <h3 className="author-signin">
                                    <h5>Autor: {post.usuario_propietario.username} - <MdOutlineStarBorderPurple500 /> {post.usuario_propietario.reputacion} pts.</h5>
                                </h3>
                                <h2 className="title-signin">
                                    {post.titulo}
                                </h2>
                                {post.imagen && <img src={post.imagen} alt="Imagen del post" className="post-image" />}
                                <p>{Object.keys(post.comentarios).length} comentario(s)</p>
                            </div>
                        </Link>
                    ))
                )}
            </div>

            <div className={`menu ${menuOpen ? 'open' : ''}`} style={{ overflow: 'auto' }}>
                <div className='menuItems'>
                    <div className="profile-box">
                        <img src={userNoProfilePicture} alt='Foto de perfil' className="profile-picture" />
                    </div>
                    <p className='usuario'> {user.username} </p>
                    <p className='puntos'> <MdOutlineStarBorderPurple500 /> {user.reputacion} pts</p>
                    <hr className='separador'></hr>
                    <div className='botonaso'>
                        <Link to="/EditProfile" className="editarPerfil-link">
                            <button className="editarPerfil-button">
                                <FaIcons.FaUserEdit /> | Editar perfil
                            </button>
                        </Link>
                    </div>
                    <Link to="/Historial" className="historial-link">
                        <button className="historial-button">
                            <FaIcons.FaHistory /> | Historial de trueques
                        </button>
                    </Link>
                    <Link to="/HistorialSolicitudes" className="misSolicitudes-link">
                        <button className="misSolicitudes-button">
                            <FaIcons.FaHandshake /> | Mis solicitudes
                        </button>
                    </Link>
                    <Link to="/my-posts" className="myposts-link">
                        <button className="myposts-button">
                            <FaIcons.FaFont /> | Publicaciones activas
                        </button>
                    </Link>
                    <Link to="/Support" className="support-link">
                        <button className="support-button">
                            <FaIcons.FaQuestionCircle /> | Contactar al soporte
                        </button>
                    </Link>
                    <button className="cerrar-sesion-button" onClick={handleLogout}>
                        <FaIcons.FaDoorOpen /> | Cerrar sesión
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
