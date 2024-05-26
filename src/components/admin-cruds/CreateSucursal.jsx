import { useState } from "react";
import { baseURL } from "../../api/trueque.api";
import axios from "axios";
import { Link } from "wouter";

function CreateSucursal() {
    const [error, setError] = useState('')
    const [form, setForm] = useState({
        nombre: '',
        direccion: '',
    });


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
                nombre: form.nombre,
                direccion: form.direccion,

            };

            const response = await axios.post(baseURL + 'adminview/sucursales/add', requestData, {
                // headers: {
                //     Authorization: `Token ${localStorage.getItem('token')}`,
                //     'Content-Type': 'multipart/form-data',
                // }
            });
            if (response.status === 201) {
                alert('Sucursal creada con éxito')
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
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <h1>Agregar sucursal</h1>
            <form>
                <div>
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="direccion"
                        placeholder="Direccion"
                        value={form.direccion}
                        onChange={handleChange}
                        required
                    />
                </div>
            </form>
            <div>
                <Link to="/adminview/sucursales">
                    <button>Volver</button>
                </Link>
                <button onClick={handleSubmit}>Agregar</button>
            </div>
        </div>


    );


}

export default CreateSucursal;
