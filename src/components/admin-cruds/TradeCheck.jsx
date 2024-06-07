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

    const isValidForm = () => {
        return ventaProductos.every(producto => producto.producto && producto.cantidad);
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!solicitud) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="container">
            <h2 className="title">Gestión de intercambio</h2>
            <div className="button-group">
                <Link to="/employeeview">
                    <button type="button" className="volver">Volver</button>
                </Link>
                <button type="button" className="rechazar">Rechazar Trueque</button>
                <button type="button" className="aceptar">Aceptar Trueque</button>
                {!solicitud.venta && (
                    <button type="button" className="registrar" onClick={() => setShowForm(true)}>Registrar Ventas</button>
                )}
            </div>
            {showForm && (
                <form onSubmit={handleRegistrarVentas} className="form">
                    {ventaProductos.map((ventaProducto, index) => (
                        <div key={index} className="form-group">
                            <select
                                value={ventaProducto.producto}
                                onChange={(e) => handleVentasChange(index, 'producto', e.target.value)}
                            >
                                <option value="">Seleccione un producto</option>
                                {productos.map((producto) => (
                                    <option key={producto.id} value={producto.id}>
                                        {producto.nombre}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="number"
                                placeholder="Cantidad"
                                value={ventaProducto.cantidad}
                                onChange={(e) => handleVentasChange(index, 'cantidad', e.target.value)}
                            />
                            <button type="button" className="remove" onClick={() => removeProducto(index)} disabled={index === 0}>-</button>
                        </div>
                    ))}
                    <button type="button" className="add" onClick={addProducto} disabled={!isValidForm()}>+</button>
                    <div className="button-group">
                        <button type="submit" className="registrar" disabled={!isValidForm()}>Confirmar venta</button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default TradeCheck;