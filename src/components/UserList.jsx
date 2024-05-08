import { useEffect, useState } from "react";
import { getAllUsers } from '../api/trueque.api'

export default function PostList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function loadUsers() {
            const res = await getAllUsers()
            setUsers(res.data)
        }
        loadUsers();
    }, [])
    return (
        <div>
            {users.map(user => (
                <div>
                    <h1>
                        {user.username}
                        <br />
                    </h1>
                    <h1>
                        {user.email}
                    </h1>
                </div>
            ))}
        </div>
    )
}