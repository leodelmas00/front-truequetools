import React, { useState } from 'react';

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

  // JavaScript para establecer el color de fondo del body
  document.body.style.backgroundColor = "#f2f0e4";

  return (
    <div align="center">
      <form onSubmit={handleSubmit}>
        <div style={{ border: '2px solid black', padding: '5px', margin: '20px', width: '600px', height: '700px' }}>
          <h1 style={{ fontSize: '5em' }}>TruequeTools</h1>
          <h1> Iniciar Sesión </h1>
          <div align="center">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '400px', height: '40px', fontSize: '1.2em' }} // Tamaño de fuente para las casillas de entrada
              required
            />
          </div>
          <div align="center">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '400px', height: '40px', fontSize: '1.2em' }} // Tamaño de fuente para las casillas de entrada
              required
            />
          </div>
          <div align="center">
            <button type="submit" style={{ width: '408px', height: '50px', fontSize: '1.2em', backgroundColor: '#f2ada7' }}>Iniciar sesión</button> {/* Modificamos el tamaño de la fuente del botón */}
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
