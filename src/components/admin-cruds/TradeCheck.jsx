import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRoute, Link } from 'wouter';
import { baseURL } from "../../api/trueque.api";
import '../../styles/TradeCheck.css'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

function TradeCheck() {
    const [match, params] = useRoute('/tradeCheck/:solicitud_id');
    const [solicitud, setSolicitud] = useState(null);
    const [error, setError] = useState(null);
    const [productos, setProductos] = useState([]);
    const [ventaProductos, setVentaProductos] = useState([{ id: '', cantidad_vendida: '' }]);
    const [showForm, setShowForm] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [detalleVenta, setDetalleVenta] = useState([]);
    const [ventasVisibles, setVentasVisibles] = useState(false);


    useEffect(() => {
        const fetchSolicitud = async () => {
            const loggedIn = localStorage.getItem('loggedIn')
            if (loggedIn) {
                try {
                    const response = await axios.get(`${baseURL}employee/solicitudes/${params.solicitud_id}/`);
                    setSolicitud(response.data);
                    console.log(response.data);
                } catch (error) {
                    setError('Error al obtener la solicitud.');
                }
            }
            else {
                alert('debes iniciar sesion para realizar esta acción')
                window.location.href = '/Login-worker';
            }
        };

        fetchSolicitud();
    }, [params.solicitud_id]);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get(`${baseURL}productos/`);
                setProductos(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };

        fetchProductos();
    }, []);

    const handleRechazarTrueque = async () => {
        const loggedIn = localStorage.getItem('loggedIn')
        if (loggedIn) {
            try {
                await axios.patch(`${baseURL}employee/solicitudes/${params.solicitud_id}/`, { action: 'reject' });
                alert('Intercambio rechazado con éxito');
                setShowForm(false);
                setOpenDialog(false);
                window.location.href = "/EmployeeView";
            } catch (error) {
                alert('Ocurrio un error inesperado');
            }
        }
        else {
            alert('debes iniciar sesion para realizar esta acción')
            window.location.href = '/Login-worker';
        }
    };

    const handleAceptarTrueque = async () => {
        const loggedIn = localStorage.getItem('loggedIn')
        if (loggedIn) {
            try {
                await axios.patch(`${baseURL}employee/solicitudes/${params.solicitud_id}/`, { action: 'accept' });
                alert('Intercambio aceptado con éxito');
                setShowForm(false);
                window.location.href = "/EmployeeView";
            } catch (error) {
                alert('Ocurrio un error inesperado');
            }
        } else {
            alert('debes iniciar sesion para realizar esta acción')
            window.location.href = '/Login-worker';
        }
    };

    const handleRegistrarVentas = async (event) => {
        event.preventDefault();
        const loggedIn = localStorage.getItem('loggedIn')
        if (loggedIn) {

            try {
                await axios.post(`${baseURL}employee/solicitudes/${params.solicitud_id}/ventas/`, { productos: ventaProductos });
                alert('Ventas registrada con éxito');
                setShowForm(false);
            } catch (error) {
                console.error('Error al registrar las ventas:', error);
                alert('Error al registrar las ventas');
            }
        } else {
            alert('debes iniciar sesion para realizar esta acción')
            window.location.href = '/Login-worker';
        }
    };

    const toggleVentas = async (event) => {
        event.preventDefault();
        if (!ventasVisibles) {
            try {
                const response = await axios.get(`${baseURL}employee/solicitudes/${params.solicitud_id}/ventas/`);
                setDetalleVenta(response.data);
            } catch (error) {
                alert('Error al obtener las ventas');
            }
        }
        setVentasVisibles(!ventasVisibles);
    }

    const handleVentasChange = (index, field, value) => {
        const updatedVentaProductos = [...ventaProductos];
        updatedVentaProductos[index][field] = value;
        setVentaProductos(updatedVentaProductos);
    };

    const addProducto = () => {
        setVentaProductos([...ventaProductos, { id: '', cantidad_vendida: '' }]);
    };

    const removeProducto = (index) => {
        const updatedVentaProductos = [...ventaProductos];
        updatedVentaProductos.splice(index, 1);
        setVentaProductos(updatedVentaProductos);
    };

    const isValidForm = () => {
        return ventaProductos.every(producto => producto.id && producto.cantidad_vendida);
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

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    // Calcular el total de ventas
    const calcularTotalVentas = () => {
        return detalleVenta.reduce((total, detalle) => {
            const totalDetalle = detalle.productos_vendidos.reduce((subtotal, producto) => {
                return subtotal + (producto.producto.precio_unitario * producto.cantidad);
            }, 0);
            return total + totalDetalle;
        }, 0);
    };

    return (
        <div className="trade-container">
            <div className="trade-box">
                <h2 className="trade-title">Gestión de intercambio</h2>
                <hr />
                <div>
                    <Link to="/employeeview">
                        <button type="button" className="trade-button">Volver</button>
                    </Link>
                    <button type="button" className="trade-button" onClick={handleOpenDialog}>Rechazar Trueque</button>
                    <button type="button" className="trade-button" onClick={handleAceptarTrueque}>Aceptar Trueque</button>
                </div>
                <hr />
                {!solicitud.venta ? (
                    <button type="button" className="trade-button" onClick={handleToggleForm}>Registrar Ventas</button>
                ) : (
                    <div>
                        <p>Ya se cargaron las ventas de este trueque!</p>
                        <button onClick={toggleVentas}>
                            {ventasVisibles ? 'Ocultar ventas' : 'Ver ventas'}
                        </button>
                        {ventasVisibles && (
                            <div>
                                <h3>Productos vendidos en el intercambio:</h3>
                                <hr />
                                {detalleVenta.map((detalle, index) => (
                                    <div key={index}>
                                        {detalle.productos_vendidos.map((producto, idx) => (
                                            <li key={idx}>
                                                {producto.producto.nombre} x{producto.cantidad} ${producto.producto.precio_unitario * producto.cantidad}
                                            </li>
                                        ))}
                                    </div>
                                ))}
                                <hr />
                                <h4>Total = ${calcularTotalVentas()}</h4>
                            </div>
                        )}
                    </div>
                )}
                {showForm && (
                    <form onSubmit={handleRegistrarVentas} className="trade-form">
                        {ventaProductos.map((ventaProducto, index) => (
                            <div key={index} className="trade-form-group">
                                <select
                                    value={ventaProducto.id}
                                    onChange={(e) => handleVentasChange(index, 'id', e.target.value)}
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
                                    value={ventaProducto.cantidad_vendida}
                                    onChange={(e) => handleVentasChange(index, 'cantidad_vendida', e.target.value)}
                                />
                                <button type="button" className="trade-remove" onClick={() => removeProducto(index)} disabled={ventaProductos.length === 1}>-</button>
                            </div>
                        ))}
                        <button type="button" className="trade-add" onClick={addProducto} disabled={!isValidForm()}>+</button>
                        <div className="button-group">
                            <button type="submit" className="registrar" disabled={!isValidForm()}>Confirmar venta</button>
                        </div>
                    </form>
                )}
            </div>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
            >
                <DialogTitle>Confirmar Acción</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Estás seguro que quieres marcar este intercambio como fallido?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleRechazarTrueque} color="primary" autoFocus>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default TradeCheck;
