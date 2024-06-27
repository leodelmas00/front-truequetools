import { useState, useEffect } from "react";
import axios from "axios";
import { useRoute, Link } from "wouter";
import { baseURL } from '../../api/trueque.api.js'
import '../../styles/SucursalEdit.css';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export default function SucursalEdit() {
    const [match, params] = useRoute('/SucursalEdit/:sucursalId');
    const [sucursal, setSucursal] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        direccion: ''
    });
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        const fetchSucursal = async () => {
            try {
                if (params && params.sucursalId) {
                    const sucursalResponse = await axios.get(`${baseURL}sucursales/${params.sucursalId}/`);
                    setSucursal(sucursalResponse.data);
                    setFormData({
                        nombre: sucursalResponse.data.nombre,
                        direccion: sucursalResponse.data.direccion
                    });
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchSucursal();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSaveChanges = async () => {
        try {
            const response = await axios.patch(`${baseURL}sucursales/${params.sucursalId}/`, formData);
            if (response.status === 200) {
                alert('Sucursal actualizada exitosamente');
                setSucursal(response.data);
            }
        } catch (error) {
            console.error('Error al actualizar sucursal:', error);
        }
    };

    const handleDeleteSucursal = async () => {
        try {
            const response = await axios.delete(`${baseURL}sucursales/${params.sucursalId}/`);
            if (response.status === 204) {
                alert('Sucursal eliminada exitosamente');
                window.location.href = '/adminview/sucursales';
            }
        } catch (error) {
            console.log(error);
            console.error('Error:', error);
        }
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <div className="sucursalEdit-container">
            <div className="sucursalEdit-box">
                <h1 className="sucursalEdit-title">Editar sucursal</h1>
                <hr />
                {sucursal ? (
                    <div className="sucursalEdit-form">
                        <div>
                            <label>Nombre</label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Dirección</label>
                            <input
                                type="text"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button onClick={handleSaveChanges}>Guardar cambios</button>
                    </div>
                ) : (
                    <p>Cargando...</p>
                )}
                <div className="sucursalEdit-buttons">
                    <Link to="/adminview/sucursales">
                        <button>Volver</button>
                    </Link>
                    <button onClick={handleOpenDialog}>Dar de baja</button>
                </div>
            </div>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Confirmar Acción</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Estás seguro que quieres eliminar esta sucursal?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleDeleteSucursal} color="primary" autoFocus>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
