import { useState, useEffect } from "react";
import axios from "axios";
import { baseURL, getAllUsers } from "../../api/trueque.api";
import { Link } from 'wouter'
import '../../styles/Users.css';

export default function Users() {
    const [users, setUsers] = useState([]);
    const [Block, setBlock] = useState(false);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        async function loadUsers() {
            //const res = await getAllUsers();
            //console.log(res.data);
            //setUsers(res.data);
        }
        loadUsers();
    }, []);

    const handleToggleBlock = () => {
        setBlock(prevBlock => !prevBlock);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        setSearchPerformed(true);
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get(`${baseURL}search-user/`, {
            //    headers: {
            //        Authorization: `Token ${token}`
            //    },
            //   params: { q: query }
            });
            setSearchResults(response.data);
            console.log("DATA:", searchResults)
        } catch (error) {
            console.error('Error during search:', error);
        }
    };

    return (
        <div className="user-container">
            <div className="user-box">
                <h1 className="user-title">Lista de usuarios</h1>
                <hr />
                <div className="user-search">
                    <input placeholder="Ingresa el correo del usuario" className="user-search-input"/>
                    <button onClick={handleSearchSubmit}> Buscar </button>
                </div>
                <div className="user-box-content">
                    Aca deberian aparecer todos los usuarios pero me tira error 401.  Diria que gero tiene que hacer algo en el Back, pero no estoy seguro.
                    {/* 
                    {users.map(user => (
                        <div key={user.id} className='user-select-box'>
                            <Link key={user.id} to={`/adminview/UserDetail/${user.id}` } className='user-link'> {user.email} </Link>
                        </div>
                    ))}
                    */}
                </div>
                <div className="user-buttons">
                    <Link to="/EmployeeView" >
                        <button >Volver</button>
                    </Link>
                    {Block ? (
                        <div>
                            <button onClick={handleToggleBlock}> Desbloquear usuario </button>
                        </div>
                    ) : (
                        <div>
                            <button onClick={handleToggleBlock}> Bloquear usuario </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}