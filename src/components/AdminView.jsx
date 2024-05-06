import React, { useState } from 'react';
import { Link } from 'wouter';
import '../styles/adminView.css';

function AdminView() {
    const [searchTerm, setSearchTerm] = useState(''); // Estado para almacenar el término de búsqueda
    const [selectedBranch, setSelectedBranch] = useState(null); // Estado para almacenar la sucursal seleccionada
    const [employees, setEmployees] = useState([
        { id: 1, dni: '12345678', name: 'Empleado 1', lastName: 'Apellido 1', branch: 'Sucursal 1' },
        { id: 2, dni: '87654321', name: 'Empleado 2', lastName: 'Apellido 2', branch: 'Sucursal 3' },
        { id: 3, dni: '45678901', name: 'Empleado 3', lastName: 'Apellido 3', branch: 'Sucursal 5' }
    ]); // Estado para almacenar la lista de empleados
    const [newEmployeeData, setNewEmployeeData] = useState({ dni: '', name: '', lastName: '', branch: '' }); // Estado para almacenar los datos del nuevo empleado
    const [confirmRemove, setConfirmRemove] = useState({ show: false, branchName: '' }); // Estado para mostrar el modal de confirmación de eliminación de sucursal
    const [confirmLogout, setConfirmLogout] = useState(false); // Estado para mostrar el modal de confirmación de cerrar sesión
    const [newBranch, setNewBranch] = useState(''); // Estado para almacenar el nombre de la nueva sucursal
    const [branches, setBranches] = useState(['Sucursal 1', 'Sucursal 2', 'Sucursal 3']); // Estado para almacenar la lista de sucursales

    const handleSearchChange = (event) => {
        const searchTerm = event.target.value.toLowerCase(); // Convertir el término de búsqueda a minúsculas
        setSearchTerm(searchTerm); // Actualizar el término de búsqueda
    };

    const handleAddBranch = () => {
        if (newBranch.trim() !== '') {
            setBranches([...branches, newBranch]); // Agrega la nueva sucursal a la lista
            setNewBranch(''); // Reinicia el valor del campo de entrada
        }
    };

    const handleRemoveBranch = () => {
        setConfirmRemove({ show: true, branchName: selectedBranch }); // Mostrar el modal de confirmación de eliminación de sucursal
    };

    const confirmRemoveBranch = () => {
        const updatedBranches = branches.filter(branch => branch !== selectedBranch);
        setBranches(updatedBranches); // Elimina la sucursal de la lista
        setSelectedBranch(null); // Desselecciona la sucursal eliminada
        setConfirmRemove({ show: false, branchName: '' }); // Oculta el modal de confirmación
    };

    const cancelRemoveBranch = () => {
        setConfirmRemove({ show: false, branchName: '' }); // Oculta el modal de confirmación
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
        const isConfirmed = window.confirm(`¿Estás seguro de eliminar al empleado "${employeeName}"?`);
        if (isConfirmed) {
            const updatedEmployees = employees.filter(employee => employee.id !== employeeId);
            setEmployees(updatedEmployees);
        }
    };
    
    const confirmRemoveEmployee = () => {
        const updatedEmployees = employees.filter(employee => employee.id !== parseInt(confirmRemove.employeeId));
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

    const handleBranchChange = (event) => {
        setSelectedBranch(event.target.value); // Actualiza la sucursal seleccionada
    };

    // Filtrar empleados según la sucursal seleccionada
    const filteredEmployees = selectedBranch
        ? employees.filter(employee => employee.branch === selectedBranch)
        : employees;

    // Aplicar filtro adicional según el término de búsqueda
    const filteredEmployeesWithSearch = filteredEmployees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm)
    );

    return (
        <div className="admin-view-container">
            <h1 style={{ textAlign: 'center' }}>Panel de Administrador</h1>
            
            <button className="cerrar-sesion-adminview-button" onClick={handleLogout}>Cerrar sesión</button>

            <div className="employee-list-container">
                <h2 style={{ textAlign: 'center' }}>Lista de Empleados</h2>
                {/* Lista desplegable para seleccionar la sucursal */}
                <select
                    onChange={handleBranchChange}
                    value={selectedBranch || ''}
                    style={{ margin: 'auto', display: 'block', textAlign: 'center' }}
                >
                    <option value="">Todas las sucursales</option>
                    {branches.map(branch => (
                        <option key={branch} value={branch}>{branch}</option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Buscar empleado..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ display: 'block', margin: '0 auto', textAlign: 'center' }}
                />
                <ul>
                    {filteredEmployeesWithSearch.map(employee => (
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

            <div className="add-remove-branch-container">
                <input
                    type="text"
                    placeholder="Nombre de la sucursal"
                    value={newBranch}
                    onChange={(event) => setNewBranch(event.target.value)}
                    style={{ display: 'block', margin: '0 auto', textAlign: 'center' }}
                />
                <div align="center">
                    <button onClick={handleAddBranch}>Añadir Sucursal</button>
                    <select
                        value={selectedBranch || ''}
                        onChange={handleBranchChange}
                        style={{ margin: 'auto', display: 'block', textAlign: 'center' }}
                    >
                        <option value="">Seleccionar sucursal a eliminar</option>
                        {branches.map(branch => (
                            <option key={branch} value={branch}>{branch}</option>
                        ))}
                    </select>
                    <button onClick={handleRemoveBranch}>Eliminar Sucursal</button>
                </div>
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
                <select
                    type="text"
                    name="branch"
                    placeholder="Sucursal"
                    className="center-input-container-alta-admin"

                    
                        value={selectedBranch || ''}
                        onChange={handleBranchChange}
                        style={{ margin: 'auto', display: 'block', textAlign: 'center' }}
                    >
                        <option value="">Seleccionar sucursal del empleado</option>
                        {branches.map(branch => (
                            <option key={branch} value={branch}>{branch}</option>
                        ))}
                </select>

                <div className="center-button-admin">
                    <button onClick={handleAddEmployee}>Dar de alta empleado</button>
                </div>
            </div>

            {confirmRemove.show && (
                <div className="modal">
                    <div className="modal-content">
                        <p>¿Estás seguro de eliminar la sucursal "{confirmRemove.branchName}"?</p>
                        <div className="modal-buttons">
                            <button onClick={confirmRemoveBranch}>Sí</button>
                            <button onClick={cancelRemoveBranch}>No</button>
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
