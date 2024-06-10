import { useState, useEffect } from "react";
import axios from "axios";
import { getAllSucursales } from "../../api/trueque.api";
import { Link } from "wouter";
import '../../styles/Sucursales.css';

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
        <div className="sucursales-container">
            <div className="sucursales-box">
                <h1 className="sucursales-title">Lista de Sucursales</h1>
                <hr />
                {/* -NOTA: Boton buscar sucursales, esta DESACTIVADO por la demo 2.
                <div className="sucursales-search">
                    <input placeholder="Ingresa la sucursal" className="sucursales-search-input"/>
                    <button> Buscar </button>
                </div>
                */}
                <div className="sucursales-box-content">
                    {sucursales.map(sucursal => (
                        <div key={sucursal.id} className='sucursales-select-box'>
                            {sucursal.nombre} - {sucursal.direccion}
                            {/* -NOTA: Boton editar, esta DESACTIVADO por la demo 2.
                            <Link key={sucursal.id} to={`/adminview/SucursalEdit/${sucursal.id}`}>
                                <button className='sucursales-edit'>Editar</button>
                            </Link>
                            */}
                        </div>
                    ))}
                </div>
                <div className="sucursales-buttons">
                    <Link to="/EmployeeView" >
                            <button>Volver</button>
                    </Link>
                    <Link to="/adminview/sucursales/add" >
                        <button>Agregar sucursal</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
