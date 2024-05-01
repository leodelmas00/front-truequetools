import React, { useState } from 'react';
import FONDO_LOGIN from './logo_1/FONDO LOGIN.png'; // Importa la imagen

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos de inicio de sesión al servidor
    console.log("Email:", email);
    console.log("Contraseña:", password);
    // Luego puedes enviar los datos al servidor para autenticación
  };

  return (
    <div style={{ backgroundColor: "#f2f0e4", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
      
      <img src={FONDO_LOGIN} alt="Logo" style={{ width: '1920px', height: '1080px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }} />
      
      <form onSubmit={handleSubmit} style={{ zIndex: 1 }}>
        <div style={{ border: '2px solid black', padding: '5px', width: '550px', height: '600px' }}>
          <h1 style={{ fontSize: '5em', textAlign: 'center' }}>Trueque<span style={{ color: '#bf4c41' }}>Tools</span></h1>
          <h2 style={{ textAlign: 'center' }}>Iniciar Sesión</h2>
          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '400px', height: '40px', fontSize: '1.2em' }}
              required
            />
          </div>

          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '400px', height: '40px', fontSize: '1.2em' }}
              required
            />
          </div>

          <div style={{ textAlign: 'center' }}>
            <button type="submit" style={{ width: '401px', height: '40px', fontSize: '1.2em', backgroundColor: '#f2ada7', borderColor: '#f2ada7' }}>Iniciar sesión</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
