import { useEffect, useState } from "react";
import { getAllPosts } from '../Api/Posts.api' //importo la funcion que hace el get

export default function PostList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function loadPosts() {
            const res = await getAllPosts()
            setPosts(res.data)
        }
        loadPosts();
    }, [])
    return (
        <div>
            {posts.map(post => (
                <div>
                    <h1>
                        {post.titulo}
                    </h1>
                </div>
            ))}
        </div>
    )
}
