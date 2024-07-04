import React, { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { IoChevronBackCircle } from 'react-icons/io5';
import '../styles/Support.css';

function Support() {
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleGoBack = () => {
        window.history.back(); // Redirige a la página anterior en el historial del navegador
    };

    const handleSubjectChange = (event) => {
        setSubject(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (!subject || !description) {
            setErrorMessage('Por favor ingresa un asunto y una descripción válida.');
        } else if (description.length > 500) {
            setErrorMessage('La descripción no debe exceder los 500 caracteres.');
        } else {
            setSnackbarMessage('Mensaje enviado al soporte con éxito');
            setSnackbarOpen(true);
            // Aquí iría la lógica para enviar los datos al backend o manejarlos localmente
            console.log('Asunto:', subject);
            console.log('Descripción:', description);
            // Reiniciar el formulario después de enviar los datos
            setSubject('');
            setDescription('');
            setErrorMessage('');
        }
    };

    const remainingCharacters = 500 - description.length;

    return (
        <div className="support-container">
            <div>
                <button className="volver-btn" onClick={handleGoBack}>
                    <IoChevronBackCircle size={25} />
                    Volver
                </button>
            </div>
            <div className="support-content">
                <h1>Contactar a soporte</h1>
                <form onSubmit={handleSubmit} className="support-form">
                    <div className="form-group-support">
                        <label htmlFor="subject" className="label-support">Asunto:</label>
                        <input
                            type="text"
                            id="subject"
                            value={subject}
                            onChange={handleSubjectChange}
                            className="input-subject-support"
                            maxLength={30}
                        />
                    </div>
                    <div className="form-group-support">
                        <label htmlFor="description" className="label-support">Descripción (máx. 500 caracteres):</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={handleDescriptionChange}
                            className="textarea-description-support"
                            maxLength={500}
                            style={{ resize: 'none' }} // Evita que el textarea sea redimensionable
                        />
                        <div className="character-counter">{remainingCharacters} caracteres restantes</div>
                    </div>
                    {errorMessage && <p className="error-message-support">{errorMessage}</p>}
                    <button type="submit" className="button-submit-support">Enviar</button>
                </form>
            </div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%', backgroundColor: '#4CAF50', color: '#FFFFFF' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Support;
