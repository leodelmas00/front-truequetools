import '../styles/signup.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../api/trueque.api';
import { getAllSucursales } from '../api/trueque.api';
import { Link, Redirect } from 'wouter';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function SignUp() {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        sucursal_favorita: '',
        fecha_de_nacimiento: ''
    });
    const [error, setError] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [sucursales, setSucursales] = useState([]);
    const [openSuccess, setOpenSuccess] = useState(false);

    useEffect(() => {
        async function loadSucursales() {
            const res = await getAllSucursales()
            setSucursales(res.data)
        }
        loadSucursales();
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (form.password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }
        try {
            const response = await axios.post(baseURL + 'register/', form);
            if (response.status === 201 && response.data.token) {
                localStorage.setItem('token', response.data.token);
                setOpenSuccess(true);
                setTimeout(() => {
                    setRedirect(true);
                }, 2000); // Espera 2 segundos antes de redirigir
            }
        } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 409) {
                setError('El correo electrónico ya está en uso');
            } else if (error.response && (error.response.status === 406 || error.response.status === 400)) {
                setError('Para registrarse en TruequeTools debe ser mayor de edad');
            } else {
                console.error('Error:', error);
                setError('Ha ocurrido un error. Por favor, inténtelo nuevamente.');
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSuccessClose = () => {
        setOpenSuccess(false);
    };

    if (redirect) {
        return <Redirect to="/Login" />;
    }

    return (
        <div className="container background-img">
            <div className='container-signup'>
                <div className='cajaFormulario'>
                    <header className="titulo"> Trueque<span style={{ color: '#BF4C41' }}>Tools</span> </header>
                    <div> <p className="subtitulo"> Registrarse, ¡más fácil que nunca! </p> </div>
                    <form onSubmit={handleSubmit} className="signup-form">
                        <p>Nombre de usuario</p>
                        <input className="input-user" name="username" placeholder="Ingrese su nombre de usuario" required onChange={handleChange} />
                        <p>Correo electrónico</p>
                        <input className="input-user" placeholder="Ingrese su correo" name="email" type="email" required onChange={handleChange} />
                        <p>Contraseña</p>
                        <input className="input-user" placeholder="Ingrese su contraseña" type="password" name="password" required onChange={handleChange} />
                        <p>Fecha de nacimiento</p>
                        <input className='input-user' type="date" name="fecha_de_nacimiento" placeholder="Dia" required onChange={handleChange} />
                        <p>Sucursal favorita</p>
                        <select
                            name="sucursal_favorita"
                            value={form.sucursal_favorita}
                            onChange={handleChange}
                            className="input-select-sucursal"
                            required
                            style={{ fontSize: '20px' }}
                        >
                            <option className="input-select-sucursal" value="" disabled>Selecciona una sucursal</option>
                            {sucursales.map((sucursal, index) => (
                                <option key={sucursal.id} value={sucursal.id}>{sucursal.nombre}{' (' + sucursal.direccion + ')'}</option>
                            ))}
                        </select>
                        {error && <p className="error-message">{error}</p>}
                        <div className='signup-botones'>
                            <Link to="/login" className="botonRegistrar">
                                <button>Volver</button>
                            </Link>
                            <div className="botonRegistrar"> <button>Registrarse</button></div>
                        </div>
                    </form>
                </div>
            </div>
            <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleSuccessClose}>
                <MuiAlert elevation={6} variant="filled" onClose={handleSuccessClose} severity="success">
                    Registro exitoso!
                </MuiAlert>
            </Snackbar>
        </div>
    );
}

export default SignUp;
