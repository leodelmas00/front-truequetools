import { useEffect, useState } from "react";
import { getAllPosts } from '../api/trueque.api'

export default function PostList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function loadPosts() {
            const res = await getAllPosts()
            console.log(res.data)
            setPosts(res.data)
        }
        loadPosts();
    }, [])
    return (
        <div>
            {posts.map(post => (
                <div>
                    <h1>
                        {post.usuario_propietario.username} <h6>{"Publicado el " + post.fecha}</h6>
                    </h1>
                    <h2>
                        {post.titulo}
                    </h2>
                </div>
            ))}
        </div>
    )
}