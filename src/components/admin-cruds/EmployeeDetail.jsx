import { useState, useEffect } from "react";
import axios from "axios";
import { useRoute, Link } from "wouter";
import { baseURL } from '../../api/trueque.api.js'
import '../../styles/EmployeeDetail.css';

export default function EmployeeDetail() {
    const [match, params] = useRoute('/adminview/EmployeeDetail/:employeeId');
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const employeeResponse = await axios.get(`${baseURL}empleados/${params.employeeId}/`);
                setEmployee(employeeResponse.data);
                console.log(employeeResponse.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchEmployee();
    }, [params.employeeId]);

    /* NOTA: Abajo deje el boton "Dar de baja", lo desactivo solo por la demo2*/

    return (
        <div className="employeeDetail-container">
            <div className="employeeDetail-box">
                <h1 className="employeeDetail-title">Detalle del empleado</h1>
                <hr/>
                {employee ? (
                    <div className="employeeDetail-info">
                        <h3> Email </h3>
                        <hr/>
                        <p> {employee.email} </p>
                        <h3> Sucursal </h3>
                        <hr/>
                        {employee.sucursal ? (
                            <p>{employee.sucursal.nombre} - {employee.sucursal.direccion}</p>
                        ) : (
                            null
                        )}
                        {/* Agrega más detalles del empleado según sea necesario */}
                    </div>
                ) : (
                    <p>Cargando...</p>
                )}
                <div className="employeeDetail-buttons">
                    <Link to="/adminview/employees">
                        <button> Volver </button>
                    </Link>
                    {/* <button> Dar de baja </button> */}
                </div>
            </div>
        </div>
    );
}
