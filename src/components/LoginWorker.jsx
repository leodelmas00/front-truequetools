
import { baseURL } from "../api/trueque.api";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "wouter";
import { Redirect } from "wouter";
import '../styles/LoginWorker.css';

function LogIn() {
    const [form, setForm] = useState({
        dni: '',
        password: ''
    });
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(baseURL + 'login-worker/', form);

            if (response.status === 200) { //&& response.data.token
                // localStorage.setItem('token', response.data.token);
                setRedirect(true);
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
        return <Redirect to="/adminview" />;
    }

    return (
        <div className="login-container">
            <div className="login-form">
                <h2 className="login-subtitle">Inicio de sesión para empleados y administradores.</h2>
                {error && <p className="login-error-message">{error}</p>}
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="login-input-container">
                        <input
                            type="text"
                            placeholder="DNI"
                            name="dni"
                            value={form.dni}
                            onChange={handleChange}
                            className="login-input-field"
                            required
                        />
                    </div>
                    <div className="login-input-container">
                        <input
                            type="password"
                            placeholder="Contraseña"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="login-input-field"
                            required
                        />
                    </div>
                    <div className="login-button-container">
                        <button type="submit" className="login-signin-button">
                            Iniciar sesión
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LogIn;