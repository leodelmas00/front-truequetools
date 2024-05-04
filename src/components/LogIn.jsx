import React, { useState } from 'react';
import { Link } from 'wouter';
import '../styles/login.css'; // Importa el archivo de estilos CSS
import 'animate.css';

function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes agregar la lógica para enviar los datos de inicio de sesión al servidor
        console.log("Email:", email);
        console.log("Contraseña:", password);
        // Luego puedes enviar los datos al servidor para autenticación
    };

    return (
        <div className="container background-img">
            <div className="form-container animate__animated animate__backInDown animate__slower" style={{ overflow: 'auto' }}>
                <h1 className="title">Trueque<span className='colorRojo'>Tools</span></h1>
                <h2 className="subtitle">Iniciar Sesión</h2>
                <form onSubmit={handleSubmit} className="">
                    <div>
                        <div className="input-container">
                            <input
                                type="email"
                                placeholder="Correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-field"
                                required
                            />
                        </div>
                        <div className="input-container">
                            <input
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-field"
                                required
                            />
                        </div>
                        <div className="button-container animate__animated animate__heartBeat animate__slower animate__delay-3s">
                            <Link to="/SignIn" className="signin-link">Iniciar sesión</Link>
                        </div>
                        <div className="signup-text">
                            <p>¿Aún no tenés una cuenta?</p>
                            <Link to="/SignUp" className="signup-link">¡Regístrate acá!</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LogIn;
