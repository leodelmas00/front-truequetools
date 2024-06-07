import { useState, useEffect } from "react";
import axios from "axios";
import { getAllSucursales } from "../../api/trueque.api";
import { Link } from "wouter";

export default function Employees() {
    const [sucursales, setSucursales] = useState([]);
    const [redirect, setRedirect] = useState(null);

    useEffect(() => {
        async function loadSucursales() {
            const res = await getAllSucursales();
            console.log(res.data);
            setSucursales(res.data);
        }
        loadSucursales();
    }, []);

    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <h1>Lista de Sucursales:</h1>
            <ul>
                {sucursales.map(sucursal => (
                    <li key={sucursal.id}>
                        {sucursal.nombre} - {sucursal.direccion}
                    </li>
                ))}
            </ul>
            <div>
                <Link to="/adminview" >
                        <button>Volver</button>
                </Link>
                <Link to="/adminview/sucursales/add" >
                    <button>Agregar sucursal</button>
                </Link>
            </div>
        </div>
    );
}