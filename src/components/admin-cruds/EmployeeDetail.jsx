import { useState, useEffect } from "react";
import axios from "axios";
import { useRoute, Link } from "wouter";
import { baseURL } from '../../api/trueque.api.js'

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

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            {employee ? (
                <div>
                    <h1>{employee.email === 'admin@truequetools.com' ? 'Administrador' : 'Empleado'}</h1>
                    <h2>{employee.email}</h2>
                    {employee.sucursal ? (
                        <h2>Trabaja en: {employee.sucursal.nombre} - {employee.sucursal.direccion}</h2>
                    ) : (
                        null
                    )}
                    <Link to="/adminview/employees">
                        <button>Volver</button>
                    </Link>
                    {/* Agrega más detalles del empleado según sea necesario */}
                </div>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
}
