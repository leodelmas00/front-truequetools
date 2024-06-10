import { useState, useEffect } from "react";
import axios from "axios";
import { useRoute, Link } from "wouter";
import { baseURL } from '../../api/trueque.api.js'
import '../../styles/SucursalEdit.css';

export default function SucursalEdit() {
    const [match, params] = useRoute('/adminview/SucursalEdit/:sucursalId');
    const [sucursal, setSucursal] = useState(null);

    useEffect(() => {
        const fetchSucursal = async () => {
            try {
                const sucursalResponse = await axios.get(`${baseURL}empleados/${params.sucursalId}/`);
                setSucursal(sucursalResponse.data);
                console.log(sucursalResponse.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchSucursal();
    }, [params.sucursalId]);

    return (
        <div className="sucursalEdit-container">
            <div className="sucursalEdit-box">
                <h1 className="sucursalEdit-title">Editar sucursal</h1>
                <hr/>
                {sucursal ? (
                    <div className="sucursalEdit-info">
                        <h3> Nombre </h3>
                        <hr/>
                        <p> {sucursal.nombre} </p>
                        <h3> Direccion </h3>
                        <hr/> 
                        <p> {sucursal.direccion} </p>
                        {/* Agrega más detalles de la sucursal según sea necesario */}
                    </div>
                ) : (
                    <p>Cargando...</p>
                )}
                <div className="sucursalEdit-buttons">
                    <Link to="/adminview/sucursales">
                        <button> Volver </button>
                    </Link>
                    {/* <button> Dar de baja </button> */}
                </div>
            </div>
        </div>
    );

}