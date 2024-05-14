import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/home.css';
import 'animate.css';
import logoImg from '../logo_1/logo_1_sinfondo.png';
import { Link } from 'wouter';
import { baseURL } from '../api/trueque.api';
import { getAllPosts } from '../api/trueque.api';
import { Redirect } from 'wouter';

function SignIn() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Agregado el estado de isLoggedIn

    const [isStaff, setIsStaff] = useState(false);
    useEffect(() => {
        fetchUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log(token)
            const response = await axios.get(`${baseURL}user-info/`, {
                headers: {
                    Authorization: `Token ${token}`,
                }
            });
            setIsStaff(response.data.is_staff);
            console.log(response);
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
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

    const [posts, setPosts] = useState([]);
    const [redirect, setRedirect] = useState(null); // Estado para redirección

    useEffect(() => {
        async function loadPosts() {
            const res = await getAllPosts();
            console.log(res.data);
            setPosts(res.data);
        }
        loadPosts();
    }, []);

    const handlePostClick = (id) => {
        setRedirect(`/post/${id}`);
    };

    if (redirect) {
        return <Redirect to={redirect} />;
    }

    return (
        <div className="backgroundHome">


            <Link to="/Post" className="post-link">
                <button className="publicar-button">Publicar</button>
            </Link>

            <a href="/" onClick={handleLogoClick}>
                <img src={logoImg} alt="Logo" className="logo" />
            </a>
            <div className="rectangle"></div>
            <div className="backgroundHome">
                <br /> {/* Salto de línea antes del título */}
                <h1 className={`title-most-searched ${menuOpen ? 'slide-right' : ''}`}>Mas destacados</h1>
            </div>
            <div className='separate-div'></div>
            <div>
                {posts.map(post => (
                    <Link key={post.id} to={`/post/${post.id}`} onClick={() => handlePostClick(post.id)}>
                        <div className="signin-post-container animate__animated animate__flipInY">
                            <h3 className="author-signin">
                                Autor: {post.usuario_propietario.username}
                            </h3>
                            <h2 className="title-signin ">
                                {post.titulo}
                            </h2>
                            <img src={post.imagen} alt="Imagen del post" className="post-image" />
                        </div>
                    </Link>
                ))}
            </div>
            <div className={`menu ${menuOpen ? 'open' : ''}`} style={{ overflow: 'auto' }}>
                <button className="cerrar-sesion-button" onClick={handleLogout}>
                    Cerrar sesión
                </button>
                {isStaff && (
                    <Link to="/PostList" className="admin-link">
                        <button className="admin-button">Ver Listado de Publicaciones</button>
                    </Link>
                )}
            </div>
            <button className="menu-button" onClick={toggleMenu}>
                Menú
            </button>
        </div>
    );

}

export default SignIn;
