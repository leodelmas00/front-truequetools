import { useState } from "react";
import { baseURL } from "../../api/trueque.api";
import axios from "axios";



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
        <div>
            <form>
                <input
                    type="text"
                    name="nombre"
                    placeholder="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="direccion"
                    placeholder="Direccion"
                    value={form.direccion}
                    onChange={handleChange}
                    required
                />
            </form>
            <button onClick={handleSubmit}>Agregar</button>


        </div>


    );


}

export default CreateSucursal;
