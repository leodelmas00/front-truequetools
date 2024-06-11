import { useState, useEffect } from "react";
import axios from "axios";
import { useRoute, Link } from "wouter";
import { baseURL } from '../../api/trueque.api.js'
import '../../styles/EmployeeDetail.css';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export default function EmployeeDetail() {
    const [match, params] = useRoute('/adminview/EmployeeDetail/:employeeId');
    const [employee, setEmployee] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

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

    const handleDeleteEmployee = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${baseURL}employee/${params.employeelId}`, {
            //    headers: {
            //        Authorization: `Token ${token}`,
            //    }
            });
            if (response.status === 204) {
                // Aquí puedes realizar cualquier acción adicional después de eliminar un empleado
                console.log('Empleado eliminado exitosamente');
            }
        } catch (error) {
            console.log(error);
            console.error('Error:', error);
            // Aquí puedes manejar los errores
        }
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

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
                    <button onClick={handleOpenDialog}> Dar de baja </button>
                </div>
            </div>

            <Dialog open={openDialog} onClose={handleCloseDialog} >
                <DialogTitle>Confirmar Acción</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Estás seguro que quieres dar de baja a este empleado?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleDeleteEmployee} color="primary" autoFocus>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}
