import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useRoute } from "wouter";
import { baseURL } from "../../api/trueque.api";

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
        <div>
            <h1>Ventas de la Solicitud {solicitudId}</h1>
            {loading ? (
                <p>Cargando ventas...</p>
            ) : (
                <div>
                    {ventas.map(venta => (
                        <div key={venta.id}>
                            <h2>Intercambio: {venta.intercambio}</h2>
                            <ul>
                                {venta.productos_vendidos.map(vp => (
                                    <li key={vp.id}>
                                        <p>Producto: {vp.producto.nombre}</p>
                                        <p>Cantidad: {vp.cantidad}</p>
                                        <p>Precio unitario: ${vp.producto.precio_unitario}</p>
                                        <p>Precio total: ${vp.cantidad * vp.producto.precio_unitario}</p>
                                    </li>
                                ))}
                            </ul>
                            <p>Precio Total de la Venta: ${calcularPrecioTotal(venta)}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default VentasDeSolicitudDetail;
