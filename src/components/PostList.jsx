import { useEffect, useState } from "react";
import { baseURL } from '../api/trueque.api';
import axios from "axios";
import { Redirect, Link } from 'wouter'; // Importa Redirect y Link desde wouter
import '../styles/PostList.css'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { URL_IMAGES, POST_IMAGE_PLACEHOLDER } from "../api/trueque.api";

export default function PostList() {
    const [posts, setPosts] = useState([]);
    const [redirect, setRedirect] = useState(null); // Estado para redirección
    const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);

    useEffect(() => {
        async function loadPosts() {
            try {
                const loggedIn = localStorage.getItem('loggedIn');
                const userEmail = localStorage.getItem('userEmail'); // Obtener el email del localStorage
                const isAdmin = localStorage.getItem('isAdmin')
                if (loggedIn === 'true' && isAdmin === 'true') {
                    try {
                        console.log(`${baseURL}admin/publicaciones/`);
                        const response = await axios.get(`${baseURL}admin/publicaciones/`, {
                            headers: {
                                'X-User-Email': userEmail
                            }
                        });
                        console.log(response.data);
                        setPosts(response.data);
                        return response.data;
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
                console.error('Error desconocido:', error);
                setErrorMessage('Error desconocido al obtener las publicaciones.');
                setOpenError(true);
            }

        }
        loadPosts();
    }, []);

    const handlePostClick = (id) => {
        setRedirect(`/post-admin/${id}`);
    };

    const handleCloseError = () => {
        setOpenError(false);
    };

    if (redirect) {
        return <Redirect to={redirect} />;
    }

    return (
        <div>
            <div className="postList-navigation-bar">
                <Link href="/EmployeeView" className="postList-link-volver">
                    <button className="postList-button"> Volver </button>
                </Link>
                <h1 className="postList-nav-titulo"> Lista de publicaciones </h1>
            </div>
            {posts.map(post => (
                <Link key={post.id} href={`/post-admin/${post.id}`} onClick={() => handlePostClick(post.id)}>
                    <div className="list-post-container">
                        <h2 className="title-list-post">
                            Titulo: {post.titulo}
                        </h2>
                        <h3 className="author">
                            Autor: {post.usuario_propietario.username}
                        </h3>
                        {post.imagen && <img src={`${POST_IMAGE_PLACEHOLDER}`} alt="Imagen del post" className="post-image" />}
                    </div>
                </Link>
            ))}
            <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError}>
                <MuiAlert elevation={6} variant="filled" onClose={handleCloseError} severity="error">
                    {errorMessage}
                </MuiAlert>
            </Snackbar>

        </div>
    );
}
