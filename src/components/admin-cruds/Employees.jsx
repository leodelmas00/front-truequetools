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
        <div>
            <h1>Lista de Empleados</h1>
            <ul>
                {employees.map(employee => (
                    <li key={employee.id}>
                        {employee.nombre} - {employee.dni}
                    </li>
                ))}
            </ul>
            <Link to="/adminview/employees/add" >
                <button>Dar de alta empleado</button>
            </Link>
        </div>
    );
}
