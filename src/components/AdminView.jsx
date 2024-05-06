import React, { useState, useEffect } from 'react';

function AdminView() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        // Simulación de solicitud a una API para obtener los empleados
        fetch('URL_DE_TU_API_EMPLEADOS')
            .then(response => response.json())
            .then(data => setEmployees(data))
            .catch(error => console.error('Error fetching employees:', error));
    }, []);

    return (
        <div>
            <h2>Lista de Empleados</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Edad</th>
                        <th>Cargo</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.nombre}</td>
                            <td>{employee.apellido}</td>
                            <td>{employee.edad}</td>
                            <td>{employee.cargo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminView;
