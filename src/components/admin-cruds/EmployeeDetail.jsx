import { useState, useEffect } from "react";
import axios from "axios";
import { useRoute, Link } from "wouter";
import '../../styles/EmployeeDetail.css';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { URL_IMAGES } from "../../api/trueque.api";

export default function EmployeeDetail() {
    const [match, params] = useRoute('/adminview/EmployeeDetail/:employeeId');
    const [employee, setEmployee] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                console.log(`${URL_IMAGES}employee/${params.employeeId}/detail/`);
                const response = await axios.get(`${URL_IMAGES}employee/${params.employeeId}/detail/`);
                setEmployee(response.data);
            } catch (error) {
                console.error('Error al cargar empleado:', error);
            }
        };

        if (params.employeeId) {
            fetchEmployee();
        }
    }, [params.employeeId]);

    const handleDeleteEmployee = async () => {
        try {
            const response = await axios.delete(`${URL_IMAGES}/employee/${params.employeeId}/`);
            if (response.status === 200) {
                console.log('Empleado eliminado exitosamente');
                alert('Empleado dado de baja con éxito')
                window.location.href = '/adminview/employees';
            }
        } catch (error) {
            console.error('Error al eliminar empleado:', error);
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
                <hr />
                {employee ? (
                    <div className="employeeDetail-info">
                        <h3>Email</h3>
                        <hr />
                        <p>{employee.email}</p>
                        <h3>Sucursal</h3>
                        <hr />
                        {employee.sucursal ? (
                            <p>{employee.sucursal.nombre} - {employee.sucursal.direccion}</p>
                        ) : (
                            null
                        )}
                    </div>
                ) : (
                    <p>Cargando...</p>
                )}
                <div className="employeeDetail-buttons">
                    <Link to="/adminview/employees">
                        <button>Volver</button>
                    </Link>
                    <button onClick={handleOpenDialog}>Dar de baja</button>
                </div>
            </div>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
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
