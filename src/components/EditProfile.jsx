import React, { useState } from 'react';
import { IoChevronBackCircle } from 'react-icons/io5'; // Importa el ícono necesario
import '../styles/EditProfile.css';

function EditProfile() {
    const [birthDate, setBirthDate] = useState('');
    const [favoriteBranch, setFavoriteBranch] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [password, setPassword] = useState('');
    const [preview, setPreview] = useState(null);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí iría la lógica para enviar los datos a tu backend o API.
        console.log({
            birthDate,
            favoriteBranch,
            username,
            email,
            profilePicture,
            password
        });
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
                        <label htmlFor="birthDate" className="label-unique">Fecha de Nacimiento:</label>
                        <input
                            type="date"
                            id="birthDate"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            className="input-date-unique"
                        />
                    </div>
                    <div className="form-group-editProfile-unique">
                        <label htmlFor="favoriteBranch" className="label-unique">Sucursal Favorita:</label>
                        <input
                            type="text"
                            id="favoriteBranch"
                            value={favoriteBranch}
                            onChange={(e) => setFavoriteBranch(e.target.value)}
                            className="input-text-unique"
                        />
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
