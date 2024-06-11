import { useState, useEffect } from "react";
import axios from "axios";
import { getAllEmployees } from "../../api/trueque.api";
import { Link } from 'wouter'
import '../../styles/Employees.css';

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
        <div className="employee-container">
            <div className="employee-box">
                <h1 className="employee-title">Lista de Empleados</h1>
                <hr />
                <div className="employee-search">
                    <input placeholder="Ingresa el correo del empleado" className="employee-search-input"/>
                    <button> Buscar </button>
                </div>
                <div className="employee-box-content">
                    {employees.map(employee => (
                        <div key={employee.id} className='employee-select-box'>
                            <Link key={employee.id} to={`/adminview/EmployeeDetail/${employee.id}` } className='employee-link'> {employee.email} </Link>
                        </div>
                    ))}
                </div>
                <div className="employee-buttons">
                    <Link to="/EmployeeView" >
                        <button >Volver</button>
                    </Link>
                    <Link to="/adminview/employees/add" >
                        <button>Dar de alta empleado</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}