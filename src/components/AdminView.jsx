import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import '../styles/adminView.css';

function AdminView() {
    const [confirmLogout, setConfirmLogout] = useState(false); // Estado para mostrar el modal de confirmación de cerrar sesión
    const [loggedIn, setLoggedIn] = useState(false); // Estado para verificar si el usuario está logueado

    useEffect(() => {
        const loggedInStatus = localStorage.getItem('loggedIn') === 'true';
        setLoggedIn(loggedInStatus);
    }, []);

    const handleLogout = () => {
        setConfirmLogout(true); // Muestra el modal de confirmación de cerrar sesión
    };

    const confirmLogoutAction = () => {
        localStorage.setItem("loggedIn", 'false');
        localStorage.setItem("isAdmin", 'false');

        window.location.href = "/Login-worker";
    };

    const cancelLogoutAction = () => {
        setConfirmLogout(false); // Oculta el modal de confirmación de cerrar sesión
    };

    return (
        <div className="admin-view-container">
            <h1 style={{ textAlign: 'center' }}>Panel de Administrador</h1>

            {confirmLogout && (
                <div className="modal">
                    <div className="modal-content">
                        <p>¿Estás seguro de cerrar sesión?</p>
                        <div className="modal-buttons">
                            <button onClick={confirmLogoutAction}>Sí</button>
                            <button onClick={cancelLogoutAction}>No</button>
                        </div>
                    </div>
                </div>
            )}


            <div>
                {loggedIn ? (
                    <>
                        <button onClick={handleLogout}>Cerrar Sesión</button>
                        <button>
                            <Link to="/PostList">Ver publicaciones</Link>
                        </button>
                        <button>
                            <Link to="/adminview/employees">Ver empleados</Link>
                        </button>
                        <button>
                            <Link to="/adminview/sucursales">Ver sucursales</Link>
                        </button>
                    </>
                ) : (
                    <div>
                        <p>Debes iniciar sesión para ver estas opciones.</p>
                        <button>
                            <Link to="/login-worker">Iniciar sesión.</Link>
                        </button>

                    </div>

                )}
            </div>
        </div >
    );
}

export default AdminView;
