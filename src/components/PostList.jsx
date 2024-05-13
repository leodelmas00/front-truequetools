import { useEffect, useState } from "react";
import { getAllPosts } from '../api/trueque.api';
import { Redirect, Link } from 'wouter'; // Importa Redirect y Link desde wouter
import '../styles/PostList.css'


export default function PostList() {
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

            <div>
            {posts.map(post => (
                <Link key={post.id} href={`/post/${post.id}`} onClick={() => handlePostClick(post.id)}>
                <div className="list-post-container animate__animated animate__fadeIn">
                    <h3 className="author">
                    Autor: {post.usuario_propietario.username}
                    </h3>
                    <h2 className="title-list-post">
                    {post.titulo}
                    </h2>
                </div>
                </Link>
            ))}
            </div>
      );
      
}
