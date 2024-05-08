import React, { useState } from 'react';
import { Redirect } from 'wouter'; // Importa Redirect de wouter
import axios from 'axios';
import { baseURL } from '../api/trueque.api';

function LogIn() {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const [redirect, setRedirect] = useState(false); // Estado para controlar la redirección
    const [error, setError] = useState(''); // Estado para manejar el mensaje de error

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
            <div className="form-container animate__animated animate__backInDown animate__slower" style={{ overflow: 'auto' }}>
                <h1 className="title">Trueque<span className='colorRojo'>Tools</span></h1>
                <h2 className="subtitle">Iniciar Sesión</h2>
                {error && <p className="error-message">{error}</p>}
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
                </form>
            </div>
        </div>
    );
}

export default LogIn;
