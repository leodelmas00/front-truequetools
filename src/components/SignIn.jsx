import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../styles/home.css';
import 'animate.css';
import logoImg from '../logo_1/logo_1_sinfondo.png';
import { Link, Redirect } from 'wouter';
import { baseURL, getAllPosts } from '../api/trueque.api';
import * as FaIcons from "react-icons/fa";
import { formatFecha } from '../utils';
import { MdOutlineStarBorderPurple500 } from "react-icons/md";


function SignIn() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const postsContainerRef = useRef(null);
    const [isStaff, setIsStaff] = useState(false);
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [posts, setPosts] = useState([]);
    const [redirect, setRedirect] = useState(null);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [nombre, setNombre] = useState(null);

    useEffect(() => {
        fetchUserInfo();
        loadPosts();
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
            setNombre(response.data.username)   /* Aca saco el nombre para mostrarlo en el menu, no se si estara bien sacarlo de aca pero bueno, cualquier cosa lo cambian jeje -mapache*/
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
        const res = await getAllPosts();
        setPosts(res.data);
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
            const response = await axios.get(`${baseURL}search-posts/`, {
                params: { q: query }
            });
            setSearchResults(response.data);
            console.log("DATA:", searchResults)
        } catch (error) {
            console.error('Error during search:', error);
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
                        placeholder="¿Que estas buscando?"
                        type="text"
                        value={query}
                        onChange={handleSearchChange}
                    />
                    <button className='search-button' onClick={handleSearchSubmit}>Buscar</button>
                </div>
                <Link to="/Post" className="post-link"> <button className="publicar-button">Publicar producto</button> </Link>
                <a href="/" onClick={handleLogoClick}> <img src={logoImg} alt="Logo" className="logo" />
                </a>
            </div>

            <br />
            <div>
                <h1 className={`title-most-searched ${menuOpen ? 'slide-right' : ''}`}>Mas destacados</h1>
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
                                    {post.imagen && <img src={`http://127.0.0.1:8000/${post.imagen}`} alt="Imagen del post" className="post-image" />}
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
                    <p className='usuario'> Usuario </p>
                    <p className='nombre-usuario'> {nombre} </p>
                    <hr className='separador'></hr>
                    <Link to="/Historial" className="historial-link">
                        <button className="historial-button">
                            <FaIcons.FaHistory /> | Historial de trueques
                        </button>
                    </Link>
                    <Link to="/my-posts" className="myposts-link">
                        <button className="myposts-button">
                            <FaIcons.FaHistory /> | Ver publicaciones activas
                        </button>
                    </Link>
                    <button className="cerrar-sesion-button" onClick={handleLogout}>
                        <FaIcons.FaDoorOpen /> | Cerrar sesión
                    </button>
                </div>
                {isStaff && (
                    <Link to="/PostList" className="admin-link">
                        <button className="admin-button">Ver Listado de Publicaciones</button>
                    </Link>
                )}
            </div>
        </div>
    );
}


export default SignIn;
