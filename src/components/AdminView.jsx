import React, { useState } from 'react';
import { Link } from 'wouter';
import '../styles/adminView.css';

function AdminView() {
    const [confirmLogout, setConfirmLogout] = useState(false); // Estado para mostrar el modal de confirmación de cerrar sesión

    const handleLogout = () => {
        setConfirmLogout(true); // Muestra el modal de confirmación de cerrar sesión
    };

    const confirmLogoutAction = () => {
        localStorage.removeItem('token'); // Elimina el token de localStorage
        localStorage.removeItem('token-info');
        window.location.href = "/Login"; // Redirecciona al usuario a la página de inicio de sesión
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
            <button onClick={handleLogout}>Cerrar Sesión</button>
            <button>
                <Link to="/PostList">Ver publicaciones</Link>
            </button>
            {/* <button>
                <Link to="/FailedTrades">Ver trueques fallidos</Link>
            </button> */}
        </div>
    );
}

export default AdminView;
