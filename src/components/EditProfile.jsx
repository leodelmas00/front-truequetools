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
    const [preview, setPreview] = useState(null);
    const [sucursales, setSucursales] = useState([]);
    const [userInfo, setUserInfo] = useState(null);

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
            formData.append('profile_picture', profilePicture); // Aquí se añade la imagen al FormData si existe
        }
        formData.append('password', password);

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
            } else {
                alert('Error al actualizar el perfil');
            }
        } catch (error) {
            console.error('Error al actualizar el perfil:', error);
            alert('Error al actualizar el perfil');
        }
    };

    const handleGoBack = () => {
        window.history.back();
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
                        >
                            <option value="" disabled>Selecciona una sucursal</option>
                            {sucursales.map((sucursal) => (
                                <option key={sucursal.id} value={sucursal.id}>
                                    {sucursal.nombre} ({sucursal.direccion})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group-editProfile-unique">
                        <label htmlFor="username" className="label-unique">Nombre de Usuario:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input-text-unique"
                        />
                    </div>
                    <div className="form-group-editProfile-unique">
                        <label htmlFor="email" className="label-unique">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-email-unique"
                        />
                    </div>
                    <div className="form-group-editProfile-unique">
                        <label htmlFor="password" className="label-unique">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-password-unique"
                        />
                    </div>
                    <button type="submit" className="button-unique">Guardar Cambios</button>
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
