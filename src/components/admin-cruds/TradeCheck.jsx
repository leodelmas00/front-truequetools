import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRoute, Link } from 'wouter';
import { baseURL } from "../../api/trueque.api";
import '../../styles/TradeCheck.css'

function TradeCheck() {
    const [match, params] = useRoute('/tradeCheck/:solicitud_id');
    const [solicitud, setSolicitud] = useState(null);
    const [error, setError] = useState(null);
    const [productos, setProductos] = useState([]);
    const [ventaProductos, setVentaProductos] = useState([{ producto: '', cantidad: '' }]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchSolicitud = async () => {
            try {
                const response = await axios.get(`${baseURL}employee/solicitudes/${params.solicitud_id}/`);
                setSolicitud(response.data);
                console.log(response.data)
            } catch (error) {
                setError('Error al obtener la solicitud.');
            }
        };

        fetchSolicitud();
    }, [params.solicitud_id]);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get(`${baseURL}productos/`);
                setProductos(response.data);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };

        fetchProductos();
    }, []);

    const handleRechazarTrueque = async () => {
        // Aca chequearia si isEmployee = true?
        try {
            await axios.post(`${baseURL}solicitudes/${params.solicitud_id}/changeState/`, "FALLIDO");
            alert('Intercambio rechazado con éxito');
            setShowForm(false);
        } catch (error) {
            alert('Ocurrio un error inesperado');
        }
    };
    
    const handleAceptarTrueque = async () => {
        // Aca chequearia si isEmployee = true?
        try {
            await axios.post(`${baseURL}solicitudes/${params.solicitud_id}/changeState/`, "ACEPTADO");
            alert('Intercambio aceptado con éxito');
            setShowForm(false);
        } catch (error) {
            alert('Ocurrio un error inesperado');
        }
    };

    const handleRegistrarVentas = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`${baseURL}employee/solicitudes/${params.solicitud_id}/ventas/`, { productos: ventaProductos });
            alert('Ventas registrada con éxito');
            setShowForm(false);
        } catch (error) {
            console.error('Error al registrar la ventas:', error);
            alert('Error al registrar las ventas');
        }
    };

    const handleVentasChange = (index, field, value) => {
        const updatedVentaProductos = [...ventaProductos];
        updatedVentaProductos[index][field] = value;
        setVentaProductos(updatedVentaProductos);
    };

    const addProducto = () => {
        setVentaProductos([...ventaProductos, { producto: '', cantidad: '' }]);
    };

    const removeProducto = (index) => {
        const updatedVentaProductos = [...ventaProductos];
        updatedVentaProductos.splice(index, 1);
        setVentaProductos(updatedVentaProductos);
    };

    const isValidForm = () => {
        return ventaProductos.every(producto => producto.producto && producto.cantidad);
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!solicitud) {
        return <div>Cargando...</div>;
    }

    const handleToggleForm = () => {
        setShowForm(prevShowForm => !prevShowForm);
      };

    return (
        <div className="trade-container">
            <div className="trade-box">
                <h2 className="trade-title"> Gestión de intercambio </h2>
                <hr/>
                <div>
                    <Link to="/employeeview">
                        <button type="button" className="trade-button">Volver</button>
                    </Link>
                    <button type="button" className="trade-button" onClick={handleRechazarTrueque}>Rechazar Trueque</button>
                    <button type="button" className="trade-button" onClick={handleAceptarTrueque}>Aceptar Trueque</button>
                </div>
                <hr/>
                {!solicitud.venta ? (
                        <button type="button" className="trade-button" onClick={handleToggleForm}>Registrar Ventas</button>
                ) : (
                    <p> Ya se cargaron las ventas de este trueque! </p>
                )}
                {showForm && (
                    <form onSubmit={handleRegistrarVentas} className="trade-form">
                        {ventaProductos.map((ventaProducto, index) => (
                            <div key={index} className="trade-form-group">
                                <select
                                    value={ventaProducto.producto}
                                    onChange={(e) => handleVentasChange(index, 'producto', e.target.value)}
                                >
                                    <option value="" className='trade-select'>Seleccione un producto</option>
                                    {productos.map((producto) => (
                                        <option key={producto.id} value={producto.id}>
                                            {producto.nombre}
                                        </option>
                                    ))}
                                </select>
                                <input className='trade-input'
                                    type="number"
                                    placeholder="Cantidad"
                                    value={ventaProducto.cantidad}
                                    onChange={(e) => handleVentasChange(index, 'cantidad', e.target.value)}
                                />
                                <button type="button" className="trade-remove" onClick={() => removeProducto(index)} disabled={index === 0}>-</button>
                            </div>
                        ))}
                        <button type="button" className="trade-add" onClick={addProducto} disabled={!isValidForm()}>+</button>
                        <div className="button-group">
                            <button type="submit" className="registrar" disabled={!isValidForm()}>Confirmar venta</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default TradeCheck;