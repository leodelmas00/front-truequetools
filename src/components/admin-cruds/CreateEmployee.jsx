import { useState, useEffect } from "react";
import { baseURL } from "../../api/trueque.api";
import axios from "axios";
import { getAllSucursales } from "../../api/trueque.api";
import { Link } from 'wouter';
import '../../styles/CreateEmployee.css';

function CreateEmployee() {
    const [error, setError] = useState('');
    const [sucursales, setSucursales] = useState([]);
    const [form, setForm] = useState({
        email: '',
        password: '',
        sucursal_de_trabajo: '',
    });

    useEffect(() => {
        async function loadSucursales() {
            const res = await getAllSucursales();
            setSucursales(res.data);
        }
        loadSucursales();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validación de campos vacíos
        if (!form.email || !form.password || !form.sucursal_de_trabajo) {
            setError('Debe rellenar todos los campos');
            return;
        }

        try {
            const requestData = {
                email: form.email,
                password: form.password,
                sucursal_de_trabajo: form.sucursal_de_trabajo,
            };

            console.log(requestData)

            const response = await axios.post(baseURL + 'adminview/employees/add', requestData);

            if (response.status === 201) {
                setError('Empleado dado de alta con éxito');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError('Ya existe un empleado con el mismo email');
            } else {
                setError('Hubo un problema al intentar dar de alta al empleado');
            }
        }
    };

    return (
        <div className="employeeAdd-container">
            <div className="employeeAdd-box">
                <h1 className="employeeAdd-title">Agregar un empleado</h1>
                <hr/>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <select
                            name="sucursal_de_trabajo"
                            value={form.sucursal_de_trabajo}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Sucursal de trabajo</option>
                            {sucursales.map((sucursal) => (
                                <option key={sucursal.id} value={sucursal.id}>
                                    {sucursal.nombre} ({sucursal.direccion})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="employeeAdd-msj">
                        <p style={{ color: error === 'Empleado dado de alta con éxito' ? 'green' : 'red' }}>{error}</p>
                    </div>
                    <div className="employeeAdd-buttons">
                        <Link to="/adminview/employees">
                            <button>Volver</button>
                        </Link>
                        <button type="submit">Agregar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateEmployee;
