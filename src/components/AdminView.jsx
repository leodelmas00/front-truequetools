import React, { useState } from 'react';
import { Link } from 'wouter';
import '../styles/adminView.css';

function AdminView() {
    const [searchTerm, setSearchTerm] = useState(''); // Estado para almacenar el término de búsqueda
    const [employees, setEmployees] = useState([
        { id: 1, dni: '12345678', name: 'Empleado 1', lastName: 'Apellido 1', branch: 'Sucursal 1' },
        { id: 2, dni: '87654321', name: 'Empleado 2', lastName: 'Apellido 2', branch: 'Sucursal 3' },
        { id: 3, dni: '45678901', name: 'Empleado 3', lastName: 'Apellido 3', branch: 'Sucursal 5' }
    ]); // Estado para almacenar la lista de empleados
    const [newEmployeeData, setNewEmployeeData] = useState({ dni: '', name: '', lastName: '', branch: '' }); // Estado para almacenar los datos del nuevo empleado
    const [confirmRemove, setConfirmRemove] = useState({ show: false, employeeId: null, employeeName: '' }); // Estado para mostrar el modal de confirmación
    const [confirmLogout, setConfirmLogout] = useState(false); // Estado para mostrar el modal de confirmación de cerrar sesión

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value); // Actualiza el término de búsqueda
    };

    const handleAddEmployee = () => {
        const newEmployee = {
            id: employees.length + 1,
            dni: newEmployeeData.dni,
            name: `${newEmployeeData.name} ${newEmployeeData.lastName}`,
            branch: newEmployeeData.branch
        };
        setEmployees([...employees, newEmployee]); // Agrega el nuevo empleado a la lista
        setNewEmployeeData({ dni: '', name: '', lastName: '', branch: '' }); // Reinicia los datos del nuevo empleado
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewEmployeeData({ ...newEmployeeData, [name]: value }); // Actualizar los datos del nuevo empleado
    };

    const handleRemoveEmployee = (employeeId, employeeName) => {
        setConfirmRemove({ show: true, employeeId: employeeId, employeeName: employeeName }); // Mostrar el modal de confirmación
    };

    const confirmRemoveEmployee = () => {
        const updatedEmployees = employees.filter(employee => employee.id !== confirmRemove.employeeId);
        setEmployees(updatedEmployees); // Actualiza la lista de empleados eliminando el empleado
        setConfirmRemove({ show: false, employeeId: null, employeeName: '' }); // Oculta el modal de confirmación
    };

    const cancelRemoveEmployee = () => {
        setConfirmRemove({ show: false, employeeId: null, employeeName: '' }); // Oculta el modal de confirmación
    };

    const handleLogout = () => {
        setConfirmLogout(true); // Muestra el modal de confirmación de cerrar sesión
    };

    const confirmLogoutAction = () => {
        localStorage.removeItem('token'); // Elimina el token de localStorage
        localStorage.removeItem('token-info');
        window.location.href = "/Login"; // Redirecciona al usuario a la página de inicio de sesión
    };

    const cancelLogoutAction = () => {
        setConfirmLogout(false); // Oculta el modal de confirmación de cerrar sesión
    };

    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-view-container">
            <h1 style={{ textAlign: 'center' }}>Panel de Administrador</h1>
            
            <button className="cerrar-sesion-adminview-button" onClick={handleLogout}>Cerrar sesión</button>

            <div className="employee-list-container">
                <h2 style={{ textAlign: 'center' }}>Lista de Empleados</h2>
                <input
                    type="text"
                    placeholder="Buscar empleado..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ display: 'block', margin: '0 auto', textAlign: 'center' }}
                />
                <ul>
                    {filteredEmployees.map(employee => (
                        <li key={employee.id}>
                            <div className="employee-info">
                                <div>DNI: {employee.dni}</div>
                                <div>Nombre: {employee.name}</div>
                                <div>Apellido: {employee.lastName}</div>
                                <div>Sucursal: {employee.branch}</div>
                            </div>
                            <button onClick={() => handleRemoveEmployee(employee.id, employee.name)}>Dar de baja empleado</button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="dar-alta-container">
                <input
                    type="text"
                    name="dni"
                    placeholder="DNI"
                    value={newEmployeeData.dni}
                    onChange={handleInputChange}
                    className="center-input-container-alta-admin"
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={newEmployeeData.name}
                    onChange={handleInputChange}
                    className="center-input-container-alta-admin"          
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Apellido"
                    value={newEmployeeData.lastName}
                    onChange={handleInputChange}
                    className="center-input-container-alta-admin"
                />
                <input
                    type="text"
                    name="branch"
                    placeholder="Sucursal"
                    value={newEmployeeData.branch}
                    onChange={handleInputChange}
                    className="center-input-container-alta-admin"
                />
                <div className="center-button-admin">
                    <button onClick={handleAddEmployee}>Dar de alta empleado</button>
                </div>
            </div>

            {confirmRemove.show && (
                <div className="modal">
                    <div className="modal-content">
                        <p>¿Estás seguro de dar de baja a {confirmRemove.employeeName}?</p>
                        <div className="modal-buttons">
                            <button onClick={confirmRemoveEmployee}>Sí</button>
                            <button onClick={cancelRemoveEmployee}>No</button>
                        </div>
                    </div>
                </div>
            )}

            {confirmLogout && (
                <div className="modal">
                    <div className="modal-content">
                        <p>¿Estás seguro de cerrar sesión?</p>
                        <div className="modal-buttons">
                            <button onClick={confirmLogoutAction}>Sí</button>
                            <button onClick={cancelLogoutAction}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminView;
