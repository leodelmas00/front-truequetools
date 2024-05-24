import { useState, useEffect } from "react";
import { baseURL } from "../../api/trueque.api";
import axios from "axios";
import { getAllSucursales } from "../../api/trueque.api";


function CreateEmployee() {
    const [error, setError] = useState('')
    const [sucursales, setSucursales] = useState([])
    const [form, setForm] = useState({
        dni: '',
        nombre: '',
        password: '',
        sucursal_de_trabajo: '',
    });

    useEffect(() => {
        async function loadSucursales() {
            const res = await getAllSucursales()
            setSucursales(res.data)
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
        try {
            const requestData = {
                dni: form.dni,
                nombre: form.nombre,
                password: form.password,
                sucursal_de_trabajo: form.sucursal_de_trabajo,
            };

            const response = await axios.post(baseURL + 'adminview/employees/add', requestData, {
                // headers: {
                //     Authorization: `Token ${localStorage.getItem('token')}`,
                //     'Content-Type': 'multipart/form-data',
                // }
            });
            if (response.status === 201) {
                alert('Empleado dado de alta con éxito')

                setError('')
            } else {
                setError('Porfavor, verifica los datos ingresados');
                console.log(error.data)
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Ha ocurrido un error');
        }
    }

    return (
        <div>
            <form>
                <input
                    type="text"
                    name="dni"
                    placeholder="Dni"
                    value={form.dni}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <select
                    name="sucursal_de_trabajo"
                    value={form.sucursal_de_trabajo}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>Selecciona sucursal de trabajo</option>
                    {sucursales.map((sucursal, index) => (
                        <option key={sucursal.id} value={sucursal.id}>{sucursal.nombre}{' (' + sucursal.direccion + ')'}</option>
                    ))}
                </select>
            </form>
            <button onClick={handleSubmit}>Agregar</button>
        </div>
    );
}

export default CreateEmployee;
