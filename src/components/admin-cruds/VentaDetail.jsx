import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useRoute, Link } from "wouter";
import { baseURL } from "../../api/trueque.api";
import '../../styles/VentaDetail.css';

function VentasDeSolicitudDetail() {
    const [ventas, setVentas] = useState([]);
    const [loading, setLoading] = useState(true);

    const [match, params] = useRoute('/adminview/Venta/:id');
    const solicitudId = params.id;

    useEffect(() => {
        const fetchVentas = async () => {
            try {

                const response = await axios.get(`${baseURL}employee/solicitudes/${solicitudId}/ventas/`);
                setVentas(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error al obtener ventas de la solicitud:', error);
            } finally {
                setLoading(false);
            }
        };

        if (solicitudId) {
            fetchVentas();
        }
    }, [solicitudId]);

    const calcularPrecioTotal = (venta) => {
        let total = 0;
        venta.productos_vendidos.forEach(vp => {
            total += vp.cantidad * vp.producto.precio_unitario;
        });
        return total;
    };

    return (
        <div className="ventaDetail-container">
            <div className="ventaDetail-box">
                <h1 className="ventaDetail-title">Ventas del intercambio {solicitudId}</h1>
                <hr />
                <div className="ventaDetail-box-content">
                    {loading ? (
                        <p>Cargando ventas...</p>
                    ) : (
                        <div>
                            {ventas.map(venta => (
                                <div key={venta.id}>
                                    {venta.productos_vendidos.map(vp => (
                                        <div className="ventaDetail-particular" key={vp.id}>
                                            <p>Producto: {vp.producto.nombre}</p>
                                            <p>Cantidad: {vp.cantidad}</p>
                                            <p>Precio unitario: ${vp.producto.precio_unitario}</p>
                                            <p>Precio total: ${vp.cantidad * vp.producto.precio_unitario}</p>
                                        </div>
                                    ))}
                                    <p className="ventaDetail-total">Precio Total de la Venta: ${calcularPrecioTotal(venta)}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="employee-buttons">
                    <Link to="/EmployeeView">
                        <button>Volver</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default VentasDeSolicitudDetail;
