import React, { useState } from 'react';
import '../styles/home.css';
import 'animate.css';
import logoImg from '../logo_1/logo_1_sinfondo.png';
import { Link } from 'wouter';

function SignIn() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Agregado el estado de isLoggedIn

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogoClick = (event) => {
        event.preventDefault();
        window.location.reload();
    };

    const [selectedOption, setSelectedOption] = useState("Rango de precios");

    const selectOption = (option) => {
        setSelectedOption(option);
    }

    const handleLogout = () => {
        localStorage.removeItem('token'); // 
        localStorage.removeItem("token-info");
        setIsLoggedIn(false); // Actualiza el estado de isLoggedIn a false
        window.location.href = "/Login";
    };

    return (
        <div className="backgroundHome">
            <input type="text" className="search-box " placeholder="¿Qué estás buscando?" />
            <button className="buscar-button">Buscar</button>

            <Link to="/Post" className="post-link">
                <button className="publicar-button">Publicar</button>
            </Link>

            <a href="/" onClick={handleLogoClick}> <img src={logoImg} alt="Logo" className="logo" /> </a>
            <div className="rectangle"></div>
            <h1 className={`title-most-searched ${menuOpen ? 'slide-right' : ''}`}>Mas buscados</h1>
            <div className={`menu ${menuOpen ? 'open' : ''}`} style={{ overflow: 'auto' }}>
                {/* <ul>
                    {/* <li>
                        <h1 className={`texto-caracteristicas-menu-negritas`}>
                            Categorias
                        </h1>
                    </li>
                    <li>
                        <h1 className={`texto-caracteristicas-menu`}>
                            <a href="#">Categoria 1</a>
                        </h1>
                    </li>
                    <li>
                        <h1 className={`texto-caracteristicas-menu`}>
                            <a href="#">Categoria 2</a>
                        </h1>
                    </li>
                    <li>
                        <h1 className={`texto-caracteristicas-menu`}>
                            <a href="#">Categoria 3</a>
                        </h1>
                    </li>
                    <li>
                        <h1 className={`texto-caracteristicas-menu`}>
                            <a href="#">Categoria 4</a>
                        </h1>
                    </li>

                    <li>
                        <h1 className={`texto-caracteristicas-menu-negritas texto-rango-de-precio-menu`}>
                            <div className="dropdown">
                                <button className="dropbtn">{selectedOption}</button>
                                <div className="dropdown-content">
                                    <a href="#" onClick={() => selectOption('Rango de precios')}> Rango de precios</a>
                                    <a href="#" onClick={() => selectOption('-$5000')}>-$5000</a>
                                    <a href="#" onClick={() => selectOption('$5000 a $10000')}>$5000 a $10000</a>
                                    <a href="#" onClick={() => selectOption('+$10000')}>+$10000</a>
                                </div>
                            </div>
                        </h1>
                    </li>
                </ul>
                <h1 className={`texto-caracteristicas-menu-negritas`}>
                    Contáctanos
                </h1>

                <Link to="/Form" className="form-link">
                    <button className="form-button">Rellenar formulario</button>
                </Link>

                <div className="texto-configuracion-menu-negritas">
                    <Link to="/Config" className="configuration-link">Configuración</Link>
                </div> */} 

                <button className="cerrar-sesion-button" onClick={handleLogout}>Cerrar sesión</button>
            </div>

            <button className="menu-button" onClick={toggleMenu}>Menú</button>
        </div>
    );
}

export default SignIn;
