import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useRoute, Link } from "wouter";
import { baseURL } from '../../api/trueque.api.js'
import '../../styles/SucursalEdit.css';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export default function SucursalEdit() {
    const [match, params] = useRoute('/adminview/SucursalEdit/:sucursalId');
    const [sucursal, setSucursal] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        const fetchSucursal = async () => {
            try {
                if (params && params.sucursalId) { // Verifica si params es null o undefined y si params.sucursalId existe
                    const sucursalResponse = await axios.get(`${baseURL}sucursales/${params.sucursalId}/`);
                    setSucursal(sucursalResponse.data);
                    console.log(sucursalResponse.data);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchSucursal();
    }, [params]);

    const handleDeleteSucursal = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${baseURL}sucursales/${params.sucursalId}`, {
            //    headers: {
            //        Authorization: `Token ${token}`,
            //    }
            });
            if (response.status === 204) {
                // Aquí puedes realizar cualquier acción adicional después de eliminar la sucursal
                console.log('Sucursal eliminada exitosamente');
            }
        } catch (error) {
            console.log(error);
            console.error('Error:', error);
            // Aquí puedes manejar los errores de acuerdo a tus necesidades
        }
    };

    const handleToggleForm = () => {
        setShowForm(prevShowForm => !prevShowForm);
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
                <hr/>
                {sucursal ? (
                    <div className="sucursalEdit-info">
                        <h3> Nombre </h3>
                        <hr/>
                        <p> {sucursal.nombre} </p>
                        <h3> Direccion </h3>
                        <hr/> 
                        <p> {sucursal.direccion} </p>
                        {/* Agrega más detalles de la sucursal según sea necesario */}
                    </div>
                ) : (
                    /*<p>Cargando...</p>*/
                    <p>
                        Falta implementar en el back para que
                        <br/>
                        muestre info de la sucursal y poder borrarla.
                        <br/>
                        De resto estaria todo (creo). -mapache
                    </p>
                )}
                <div className="sucursalEdit-buttons">
                    <Link to="/adminview/sucursales">
                        <button> Volver </button>
                    </Link>
                    <button onClick={handleOpenDialog}> Dar de baja </button>
                </div>
            </div>

            <Dialog open={openDialog} onClose={handleCloseDialog} >
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