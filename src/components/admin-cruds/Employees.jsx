import { useState, useEffect } from "react";
import axios from "axios";
import { getAllEmployees } from "../../api/trueque.api";
import { Link } from 'wouter'

export default function Employees() {
    const [employees, setEmployees] = useState([]);
    const [redirect, setRedirect] = useState(null);

    useEffect(() => {
        async function loadEmployees() {
            const res = await getAllEmployees();
            console.log(res.data);
            setEmployees(res.data);
        }
        loadEmployees();
    }, []);


    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <h1>Lista de Empleados</h1>
            <ul>
                {employees.map(employee => (
                    <li key={employee.id} style={{ marginTop: '5px' }}>
                        <Link key={employee.id} to={`/adminview/EmployeeDetail/${employee.id}`} style={{ backgroundColor: '#f2ada7', borderRadius: '6px' }}> {employee.email} </Link>
                    </li>
                ))}
            </ul>
            <div>
                <Link to="/EmployeeView" >
                    <button>Volver</button>
                </Link>
                <Link to="/adminview/employees/add" >
                    <button>Dar de alta empleado</button>
                </Link>
            </div>
        </div>
    );
}