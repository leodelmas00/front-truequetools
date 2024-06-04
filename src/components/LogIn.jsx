import React, { useState } from 'react';
import { Redirect } from 'wouter'; // Importa Redirect de wouter
import axios from 'axios';
import { baseURL } from '../api/trueque.api';
import { Link } from 'wouter';
import '../styles/login.css';


function LogIn() {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(baseURL + 'login/', form);

            if (response.status === 200 && response.data.token) {
                localStorage.setItem('token', response.data.token);
                setRedirect(true); // credenciales válidas, habilito redirección
            } else {
                setError('Correo electrónico o contraseña incorrectos');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Correo electrónico o contraseña incorrecta');
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    if (redirect) {
        return <Redirect to="/signIn" />;
    }

    return (
        <div className="container background-img">
            <div className="form-container" style={{ overflow: 'auto' }}>
                <h1 className="title-login">Trueque<span className='colorRojo'>Tools</span></h1>
                <h2 className="subtitle">Iniciar Sesión</h2>
                {error && <h3 className="error-message">{error}</h3>}
                <form onSubmit={handleSubmit} className="">
                    <div>
                        <div className="input-container">
                            <input
                                type="text"
                                placeholder="Correo electrónico"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="input-field"
                                required
                            />
                        </div>
                        <div className="input-container">
                            <input
                                type="password"
                                placeholder="Contraseña"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                className="input-field"
                                required
                            />
                        </div>
                        <div className="button-container animate__animated animate__heartBeat animate__slower animate__delay-3s">
                            <button type="submit" className="signin-link">Iniciar sesión</button>
                        </div>

                    </div>
                    <div className="signup-text">
                        <p>¿Aún no tenés una cuenta?</p>
                        <Link to="/SignUp" className="signup-link">Registrate acá </Link>
                    </div>
                    <div className='empleado-redireccion' >
                        <p>¿Sos empleado? <Link to="/login-worker" className='empleado-link'>Ingresá desde aqui</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LogIn;