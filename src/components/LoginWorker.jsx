import { baseURL } from "../api/trueque.api";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "wouter";
import { Redirect } from "wouter";
import '../styles/LoginWorker.css';

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
            const response = await axios.post(baseURL + 'login-worker/', form);

            if (response.status === 200 && response.data) {
                console.log(response.data)
                localStorage.setItem('loggedIn', true)
                localStorage.setItem('userEmail', response.data.email)
                if (response.data.email === 'admin@truequetools.com')
                    localStorage.setItem('isAdmin', true)

                else
                    localStorage.setItem('isAdmin', false)

                console.log(response.data)
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

    if (redirect && localStorage.getItem('isAdmin') === 'true') {
        return <Redirect to="/AdminView" />;
    } else if (redirect) {
        return <Redirect to="/EmployeeView" />
    }

    return (
        <div className="login-container">
            <form className="cajaFormulario" onSubmit={handleSubmit}>
                <h2>Inicio de sesión para empleados/administradores.</h2>
                <div>
                    <input
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={form.email}
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
                    <Link to="/login" className="admin-link">
                        <button>Volver</button>
                    </Link>
                    <button type="submit">
                        Iniciar sesión
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LogIn;