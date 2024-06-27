import { useState, useEffect } from "react";
import axios from "axios";
import { baseURL, getAllEmployees } from "../../api/trueque.api";
import { Link } from 'wouter';
import '../../styles/Employees.css';

export default function Employees() {
    const [employees, setEmployees] = useState([]);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        async function loadEmployees() {
            try {
                const response = await getAllEmployees();
                setEmployees(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        loadEmployees();
    }, []);

    const handleSearchChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        setSearchPerformed(true);
        try {
            const response = await axios.get(`${baseURL}adminview/employees/`, {
                params: { q: query }
            });
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error during search:', error);
        }
    };

    const employeesToDisplay = searchPerformed ? searchResults : employees;

    return (
        <div className="employee-container">
            <div className="employee-box">
                <h1 className="employee-title">Lista de Empleados</h1>
                <hr />
                <div className="employee-search">
                    <input
                        className="employee-search-input"
                        placeholder="Ingresa el correo del empleado"
                        type="text"
                        value={query}
                        onChange={handleSearchChange}
                    />
                    <button onClick={handleSearchSubmit}>Buscar</button>
                </div>
                <div className="employee-box-content">
                    {employeesToDisplay.map(employee => (
                        <div key={employee.id} className='employee-select-box'>
                            <Link key={employee.id} to={`/adminview/EmployeeDetail/${employee.id}/`} className='employee-link'>
                                {employee.email}
                            </Link>
                        </div>
                    ))}
                </div>
                <div className="employee-buttons">
                    <Link to="/EmployeeView">
                        <button>Volver</button>
                    </Link>
                    <Link to="/adminview/employees/add">
                        <button>Dar de alta empleado</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
