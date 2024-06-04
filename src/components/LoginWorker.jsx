
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
    const [loggedIn, setLoggedIn] = useState('');


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

    if (redirect && form.dni === 'admin' && form.password === 'admin') {
        return <Redirect to="/adminview" />;
    } else if (redirect) {
        return <Redirect to="/employeeview" />
    }



    return (
        <div className="login-container">
            <div>
                <div className="container">
                    <form className="cajaFormulario" onSubmit={handleSubmit}>
                        <h2>Inicio de sesión para empleados/administradores.</h2>
                        <div>
                            <input
                                type="text"
                                placeholder="DNI"
                                name="dni"
                                value={form.dni}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Contraseña"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <div>
                            <button type="submit">
                                Iniciar sesión
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LogIn;