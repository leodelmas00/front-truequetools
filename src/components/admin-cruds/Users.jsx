import { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../api/trueque.api";
import { Link } from 'wouter';
import '../../styles/Users.css';

export default function Users() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        async function loadUsers() {
            try {
                const response = await axios.get(`${baseURL}adminview/search-users/`, {
                    params: { q: query }
                });
                if (query) {
                    setSearchResults(response.data);
                } else {
                    setUsers(response.data);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        loadUsers();
    }, [query]);

    const handleSearchChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        setSearchPerformed(true);
        try {
            const response = await axios.get(`${baseURL}adminview/search-users/`, {
                params: { q: query }
            });
            setSearchResults(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error during search:', error);
        }
    };

    const handleToggleBlock = async () => {
        if (!selectedUser) return;
        try {
            await axios.patch(`${baseURL}adminview/toggle-block/${selectedUser.id}/`, {
                bloqueado: !selectedUser.bloqueado
            });
            console.log(selectedUser)
            // Recargar usuarios después de cambiar el estado de bloqueo
            const response = await axios.get(`${baseURL}adminview/search-users/`, {
                params: { q: query }
            });
            if (query) {
                setSearchResults(response.data);
            } else {
                setUsers(response.data);
            }
            // Actualizar usuario seleccionado
            const updatedUser = response.data.find(user => user.id === selectedUser.id);
            setSelectedUser(updatedUser);
        } catch (error) {
            console.error('Error toggling block status:', error);
        }
    };

    const usersToDisplay = searchPerformed ? searchResults : users;

    return (
        <div className="user-container">
            <div className="user-box">
                <h1 className="user-title">Lista de usuarios</h1>
                <hr />
                <div className="user-search">
                    <input
                        className='user-search-input'
                        placeholder="Ingresa el correo del usuario"
                        type="text"
                        value={query}
                        onChange={handleSearchChange}
                    />
                    <button onClick={handleSearchSubmit}>Buscar</button>
                </div>
                <div className="user-box-content">
                    {usersToDisplay.map(user => (
                        <div
                            key={user.id}
                            className={`user-select-box ${selectedUser?.id === user.id ? 'selected' : ''}`}
                            onClick={() => setSelectedUser(user)}
                        >
                            <span>{user.email} - {user.bloqueado ? 'Bloqueado' : 'Desbloqueado'}</span>
                        </div>
                    ))}
                </div>
                <div className="user-buttons">
                    <Link to="/EmployeeView">
                        <button>Volver</button>
                    </Link>
                    {selectedUser && (
                        <div>
                            <button onClick={handleToggleBlock}>
                                {selectedUser.bloqueado ? 'Desbloquear usuario' : 'Bloquear usuario'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
