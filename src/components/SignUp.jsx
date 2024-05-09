import '../styles/signup.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../api/trueque.api';
import { getAllSucursales } from '../api/trueque.api';
import { Redirect } from 'wouter';

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

    useEffect(() => {
        async function loadSucursales() {
            const res = await getAllSucursales()
            setSucursales(res.data)
        }
        loadSucursales();
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(baseURL + 'register/', form);
            console.log(response.status);
            if (response.status === 201 && response.data.token) {
                localStorage.setItem('token', response.data.token);
                setRedirect(true);
            }
        } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 409) {
                setError('El correo electrónico ya está en uso');
            } else if (error.response && error.response.status === 406) {
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

    if (redirect) {
        return <Redirect to="/signIn" />;
    }

    return (
        <div className='container-signup'>
            <div>
                <header className="titulo"> Trueque<span style={{ color: '#BF4C41' }}>Tools</span> </header>
                <p className="subtitulo"> Registrarse, ¡mas facil que nunca! </p>
                <div className='cajaFormulario'>
                    {error && <h3 className="error-message">{error}</h3>}
                    <form onSubmit={handleSubmit}>
                        <div className='formIzq'>
                            <div> * Nombre de usuario<div> <input name="username" placeholder="Ingrese su nombre de usuario" required onChange={handleChange} /> </div> </div>
                            <div> * Correo electronico <div> <input placeholder="Ingrese su correo" name="email" type="email" required onChange={handleChange} /> </div> </div>
                            <div className="input-container"> Sucursal favorita
                                <select
                                    name="sucursal_favorita"
                                    value={form.sucursal_favorita}
                                    onChange={handleChange}
                                    className="input-field"
                                    required
                                >
                                    <option value="" disabled>Selecciona una sucursal</option>
                                    {sucursales.map((sucursal, index) => (
                                        <option key={sucursal.id} value={sucursal.id}>{sucursal.nombre}{sucursal.direccion}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='formDer'>
                            <div> * Fecha de nacimiento
                                <input type="date" name="fecha_de_nacimiento" placeholder="Dia" required onChange={handleChange} />
                            </div>
                            <div> * Contraseña <div> <input placeholder="Ingrese su contraseña" type="password" name="password" required onChange={handleChange} /> </div> </div>
                            <div className="botonRegistrar"> <button>Registrarse</button> </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;