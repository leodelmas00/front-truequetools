import { useState, useEffect } from "react";
import axios from "axios";
import { baseURL, getAllEmployees } from "../../api/trueque.api";
import { Link } from 'wouter'
import '../../styles/Employees.css';

export default function Employees() {
    const [employees, setEmployees] = useState([]);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        async function loadEmployees() {
            const res = await getAllEmployees();
            console.log(res.data);
            setEmployees(res.data);
        }
        loadEmployees();
    }, []);

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        setSearchPerformed(true);
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get(`${baseURL}search-employee/`, {
            //    headers: {
            //        Authorization: `Token ${token}`
            //    },
            //   params: { q: query }
            });
            setSearchResults(response.data);
            console.log("DATA:", searchResults)
        } catch (error) {
            console.error('Error during search:', error);
        }
    };


    return (
        <div className="employee-container">
            <div className="employee-box">
                <h1 className="employee-title">Lista de Empleados</h1>
                <hr />
                <div className="employee-search">
                    <input placeholder="Ingresa el correo del empleado" className="employee-search-input"/>
                    <button onClick={handleSearchSubmit}> Buscar </button>
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