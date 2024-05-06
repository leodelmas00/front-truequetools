import React, { useState } from 'react';
import { Link, Redirect } from 'wouter'; // Importa Redirect de wouter
import '../styles/login.css'; // Importa el archivo de estilos CSS
import 'animate.css';

function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false); // Estado para controlar la redirección

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (email === "user" && password === "user") {
            console.log("Inicio de sesión exitoso como usuario");
            setRedirect("/SignIn");
        } else if (email === "admin" && password === "admin") {
            console.log("Inicio de sesión exitoso como administrador");
            setRedirect("/AdminView");
        } else {
            console.log("Credenciales incorrectas");
        }
    };

    if (redirect) {
        return <Redirect to={redirect} />;
    }

    return (
        <div className="container background-img">
            <div className="form-container animate__animated animate__backInDown animate__slower" style={{ overflow: 'auto' }}>
                <h1 className="title">Trueque<span className='colorRojo'>Tools</span></h1>
                <h2 className="subtitle">Iniciar Sesión</h2>
                <form onSubmit={handleSubmit} className="">
                    <div>
                        <div className="input-container">
                            <input
                                type="text" // Cambia el tipo de entrada a texto
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
                            <button type="submit" className="signin-link">Iniciar sesión</button>
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
