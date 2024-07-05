import React, { useState, useEffect } from 'react';
import { IoChevronBackCircle } from 'react-icons/io5';
import axios from 'axios';
import '../styles/EditProfile.css';
import { baseURL } from '../api/trueque.api';
import { getAllSucursales, getUserInfo } from '../api/trueque.api';

function EditProfile() {
    const [favoriteBranch, setFavoriteBranch] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [preview, setPreview] = useState(null);
    const [sucursales, setSucursales] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);
    const [editFields, setEditFields] = useState({
        favoriteBranch: false,
        username: false,
        email: false
    });

    useEffect(() => {
        async function loadSucursales() {
            const res = await getAllSucursales();
            setSucursales(res.data);
        }

        async function loadUserInfo() {
            const res = await getUserInfo();
            setUserInfo(res.data);
            if (res.data && res.data.sucursal_favorita) {
                setFavoriteBranch(res.data.sucursal_favorita.id);
            }
            setUsername(res.data.username);
            setEmail(res.data.email);
        }

        loadSucursales();
        loadUserInfo();
    }, []);

    const handleImagenSeleccionada = (event) => {
        const imagenSeleccionada = event.target.files[0];
        if (imagenSeleccionada) {
            setProfilePicture(imagenSeleccionada);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(imagenSeleccionada);
        } else {
            setProfilePicture(null);
            setPreview(null);
        }
    };

    const handleEliminarFoto = () => {
        setProfilePicture(null);
        setPreview(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('sucursal_favorita', favoriteBranch);
        formData.append('username', username);
        formData.append('email', email);
        if (profilePicture) {
            formData.append('avatar', profilePicture);
        }
        if (changingPassword && newPassword && newPassword === confirmNewPassword) {
            formData.append('new_password', newPassword);
        } else if (changingPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.patch(`${baseURL}profile/`, formData, {
                headers: {
                    Authorization: `Token ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                alert('Perfil actualizado con éxito');
                setPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
                setChangingPassword(false);
                window.history.back();
            }
        } catch (error) {
            if (error.response && error.response.status === 406) {
                alert('La contraseña debe tener al menos 6 caracteres');
            }
            console.error('Error al actualizar el perfil:', error);
        }
    };

    const handleGoBack = () => {
        window.history.back();
    };

    const handleEditField = (field) => {
        setEditFields({
            ...editFields,
            [field]: !editFields[field]
        });
    };

    return (
        <div className='background-editProfile-unique'>
            <div>
                <button className="volver-btn" onClick={handleGoBack}>
                    <IoChevronBackCircle size={25} />
                    Volver
                </button>
            </div>
            <div className="edit-profile-container-unique">
                <form onSubmit={handleSubmit} className="inputs-form-unique">
                    <div className="form-group-editProfile-unique">
                        <label htmlFor="favoriteBranch" className="label-unique">Sucursal Favorita:</label>
                        <select
                            name="favoriteBranch"
                            id="favoriteBranch"
                            value={favoriteBranch}
                            onChange={(e) => setFavoriteBranch(e.target.value)}
                            className="input-text-sucursal-unique"
                            disabled={!editFields.favoriteBranch}
                        >
                            {sucursales.map((sucursal) => (
                                <option key={sucursal.id} value={sucursal.id}>
                                    {sucursal.nombre} ({sucursal.direccion})
                                </option>
                            ))}
                        </select>

                        <button
                            type="button"
                            onClick={() => handleEditField('favoriteBranch')}
                            className="edit-field-btn"
                        >
                            {editFields.favoriteBranch ? 'Guardar' : 'Cambiar'}
                        </button>
                    </div>
                    <div className="form-group-editProfile-unique">
                        <label htmlFor="username" className="label-unique">Nombre de Usuario:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input-text-unique"
                            disabled={!editFields.username}
                        />
                        <button
                            type="button"
                            onClick={() => handleEditField('username')}
                            className="edit-field-btn"
                        >
                            {editFields.username ? 'Guardar' : 'Cambiar'}
                        </button>
                    </div>
                    <div className="form-group-editProfile-unique">
                        <label htmlFor="email" className="label-unique">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-email-unique"
                            disabled={!editFields.email}
                        />
                        <button
                            type="button"
                            onClick={() => handleEditField('email')}
                            className="edit-field-btn"
                        >
                            {editFields.email ? 'Guardar' : 'Cambiar'}
                        </button>
                    </div>
                    
                    {!changingPassword && (
                        <button
                            type="button"
                            onClick={() => setChangingPassword(true)}
                            className="cambiar-password-btn"
                        >
                            Cambiar Contraseña
                        </button>
                    )}
                    {changingPassword && (
                        <>
                            <div className="form-group-editProfile-unique">
                                <label htmlFor="newPassword" className="label-unique">Nueva Contraseña:</label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="input-password-unique"
                                    placeholder="Nueva contraseña"
                                />
                            </div>
                            <div className="form-group-editProfile-unique">
                                <label htmlFor="confirmNewPassword" className="label-unique">Confirmar Nueva Contraseña:</label>
                                <input
                                    type="password"
                                    id="confirmNewPassword"
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    className="input-password-unique"
                                    placeholder="Confirmar nueva contraseña"
                                />
                            </div>
                        </>
                    )}
                    <button type="submit" className="button-unique">Aplicar Cambios</button>
                </form>
                <div className="image-form-unique">
                    <div className="form-group-editProfile-unique">
                        {profilePicture ? (
                            <div className="image-preview-container">
                                <img src={URL.createObjectURL(profilePicture)} alt="Vista previa de la imagen" className='profile-picture-preview-unique' />
                                <div className="button-container">
                                    <button
                                        type="button"
                                        onClick={handleEliminarFoto}
                                        className="eliminar-foto-button"
                                    >
                                        Eliminar foto
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <label htmlFor="file-upload" className="custom-file-upload">
                                Subir foto
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImagenSeleccionada}
                                    style={{ display: 'none' }}
                                />
                            </label>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;
