import React, { useState } from 'react';

function App() {
  
  return (
    <div>
      <form>
        <h1> LOGIN </h1>
        <div>
          <input placeholder='Nombre de usuario'/>
        </div>
        <div>
          <input placeholder='Contraseña'/>
        </div>
        <div>
          <button type="submit">Iniciar sesion</button>
        </div>
      </form>
    </div>
  );
}

export default App;
