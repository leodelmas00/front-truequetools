import { useEffect, useState } from "react";
import { getAllComments } from '../api/trueque.api'

export default function CommentList() {
    const [comment, setComments] = useState([]);

    useEffect(() => {
        async function loadComments() {
            const res = await getAllComments()
            setComments(res.data)
        }
        loadComments();
    }, [])
    return (
        <div>
            {comment.map(comment => (
                <div>
                    <h1>
                        {comment.usuario_propietario.username}

                    </h1>
                    <h2>
                        {comment.contenido}
                    </h2>
                </div>
            ))}
        </div>
    )
}