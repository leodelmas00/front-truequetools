import React, { useState, useEffect, useRef } from 'react';
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
    const postsContainerRef = useRef(null);
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
    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
        if (postsContainerRef.current) {
            if (menuOpen) {
                postsContainerRef.current.classList.add('shifted'); // Use the ref to access the element
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

            <br />
            <div>
                <h1 className={`title-most-searched ${menuOpen ? 'slide-right' : ''}`}>Mas destacados</h1>
            </div>

            <div className='separate-div'></div>

            <div className={`posts-container ${menuOpen ? 'shifted' : ''}`} ref={postsContainerRef}>
                {posts.map(post => (
                    <Link key={post.id} to={`/post/${post.id}`} onClick={() => handlePostClick(post.id)}>
                        <div className="signin-post-container" >
                            <h3 className="author-signin">
                                Autor: {post.usuario_propietario.username}
                            </h3>
                            <h2 className="title-signin ">
                                {post.titulo}
                            </h2>
                            {post.imagen && <img src={post.imagen} alt="Imagen del post" className="post-image" />}
                            <p>{Object.keys(post.comentarios).length} comentario(s)</p>
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
            <button className="menu-button" onClick={handleMenuToggle}>
                Menú
            </button>
        </div>
    );


}

export default SignIn;
