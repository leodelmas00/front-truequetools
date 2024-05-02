import React, { useState } from 'react';
import '../styles/home.css'; // Importa el archivo de estilos CSS desde la carpeta styles
import 'animate.css';
import logoImg from '../logo_1/logo_1_sinfondo.png'; // Importa la imagen desde la carpeta logo_1

function SignIn() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogoClick = (event) => {
        event.preventDefault(); // Evita el comportamiento predeterminado del enlace
        window.location.reload(); // Recarga la página actual
    };

    return (
        <div className="backgroundHome">
            <input type="text" className="search-box " placeholder="¿Qué estás buscando?" />
            <button className="buscar-button">Buscar</button>
            <button className="publicar-button">Publicar</button>
            <a href="/" onClick={handleLogoClick}>
                <img src={logoImg} alt="Logo" className="logo" />
            </a>
            <div className="rectangle"></div>
            <div className={`menu ${menuOpen ? 'open' : ''}`}>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                </ul>
            </div>
            <button className="menu-button" onClick={toggleMenu}>Menú</button>
        </div>
    );
}

export default SignIn;
