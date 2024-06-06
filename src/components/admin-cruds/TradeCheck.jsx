import React, { useState, useEffect } from 'react';
import { Link } from 'wouter'

function TradeCheck() {
    const [form, setForm] = useState({
        productoUsuario1: '',
        cantidadUsuario1: '',
        productoUsuario2: '',
        cantidadUsuario2: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <form>
                Usuario 1
                <hr/>
                <div>
                    Producto:
                    <select style={{marginLeft: '10px' , marginRight: '10px'}}
                        name="productoUsuario1"
                        value={form.productoUsuario1}
                        onChange={handleChange}
                        required
                    />
                    Cantidad:
                    <select style={{marginLeft: '10px'}}
                        name="cantidadUsuario1"
                        value={form.cantidadUsuario1}
                        onChange={handleChange}
                        required
                    >
                    </select>
                </div>
                <hr/>
                Usuario 2
                <hr/>
                <div>
                    Producto:
                    <select style={{marginLeft: '10px' , marginRight: '10px'}}
                        name="productoUsuario2"
                        value={form.productoUsuario2}
                        onChange={handleChange}
                        required
                    />
                    Cantidad:
                    <select style={{marginLeft: '10px'}}
                        name="cantidadUsuario2"
                        value={form.cantidadUsuario2}
                        onChange={handleChange}
                        required
                    >
                    </select>
                </div>
                <hr/>
                <Link to="/employeeview" style={{marginRight: '1px'}} >
                        <button>Volver</button>
                </Link>
                <button style={{marginRight: '1px'}}>Rechazar Trueque</button>
                <button style={{marginLeft: '1px'}}>Aceptar Trueque</button>
            </form>
        </div>
    );
}

export default TradeCheck;
