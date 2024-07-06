import React, { useState, useEffect } from 'react';
import '../styles/HighlightPost.css';
import { TbCoinFilled } from "react-icons/tb";
import { baseURL } from '../api/trueque.api';
import axios from 'axios';
import { useParams } from "wouter"; // Importar desde 'wouter'

function HighlightPost() {
  const [cardNumber1, setCardNumber1] = useState("");
  const [cardNumber2, setCardNumber2] = useState("");
  const [cardNumber3, setCardNumber3] = useState("");
  const [cardNumber4, setCardNumber4] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showInsufficientMessage, setShowInsufficientMessage] = useState(false);
  const [showIncompleteFieldsMessage, setShowIncompleteFieldsMessage] = useState(false);
  const [showInvalidCardMessage, setShowInvalidCardMessage] = useState(false);
  const [publicacionId, setPublicacionId] = useState(null);
  const params = useParams(); // Usar solo useParams, no es un array destructuring

  useEffect(() => {
    if (params && params.publicacion_id) {
      console.log("Publicacion ID:", params.publicacion_id);
      setPublicacionId(params.publicacion_id);
    }
  }, [params]);

  const handleGoBack = () => {
    window.history.back(); // Redirige a la página anterior en el historial del navegador
  };

  const handlePagar = async () => {
    // Verificar si algún campo está vacío
    if (!cardNumber1 || !cardNumber2 || !cardNumber3 || !cardNumber4 || !expiryDate || !cvv) {
      setShowIncompleteFieldsMessage(true);
      setShowInsufficientMessage(false);
      setShowSuccess(false);
      setShowInvalidCardMessage(false);
      return;
    }

    // Verificar si los números de tarjeta son todos 1111
    if (cardNumber1 === "1111" && cardNumber2 === "1111" && cardNumber3 === "1111" && cardNumber4 === "1111") {
      setShowInsufficientMessage(true);
      setShowSuccess(false);
      setShowIncompleteFieldsMessage(false);
      setShowInvalidCardMessage(false);
      // Reiniciar los campos
      setCardNumber1("");
      setCardNumber2("");
      setCardNumber3("");
      setCardNumber4("");
      setExpiryDate("");
      setCvv("");
    }
    // Verificar si los números de tarjeta son todos 2222
    else if (cardNumber1 === "2222" && cardNumber2 === "2222" && cardNumber3 === "2222" && cardNumber4 === "2222") {
      setShowSuccess(true);
      setShowInsufficientMessage(false);
      setShowIncompleteFieldsMessage(false);
      setShowInvalidCardMessage(false);

      try {
        const token = localStorage.getItem('token');
        console.log("Publicacion ID antes de axios:", publicacionId);
        await axios.patch(
          `${baseURL}mis-publicaciones/${publicacionId}/destacar/`, {},  // Usar publicacionId en lugar de params.publicacion_id
          {
            headers: {
              Authorization: `Token ${token}`,
            }
          }
        );
        // Manejo adicional después de realizar el pago exitosamente
      } catch (error) {
        console.error("Error destacando la publicación", error);
        // Manejo de errores
      }
    } else {
      setShowInvalidCardMessage(true);
      setShowSuccess(false);
      setShowInsufficientMessage(false);
      setShowIncompleteFieldsMessage(false);
    }
  };

  const handleExpiryDateChange = (e) => {
    const input = e.target.value.replace(/\D/g, ''); // Eliminar todos los caracteres no numéricos
    if (input.length <= 2) {
      setExpiryDate(input);
    } else if (input.length <= 4) {
      setExpiryDate(input.slice(0, 2) + '/' + input.slice(2));
    }
  };

  const handleAceptar = () => {
    setShowInsufficientMessage(false);
    setShowSuccess(false);
    setShowIncompleteFieldsMessage(false);
    setShowInvalidCardMessage(false);
  };

  const handleAceptarSuccess = () => {
    setShowSuccess(false);
    // Redirigir a /SignIn o a otra página según sea necesario
    window.location.href = "/SignIn";
  };

  return (
    <div className="container-card">
      <div>
        <button className="volver-btn" onClick={handleGoBack}>
          Volver
        </button>
      </div>

      <div className="container-precio">
        <p className="monto-a-pagar">Monto a pagar: $9,999</p>
      </div>

      <div className="credit-card">
        <div className="blackline"></div>
        <div className="card-number">
          <input type="text" maxLength="4" placeholder="XXXX" required value={cardNumber1} onChange={(e) => setCardNumber1(e.target.value)} />
          <input type="text" maxLength="4" placeholder="XXXX" required value={cardNumber2} onChange={(e) => setCardNumber2(e.target.value)} />
          <input type="text" maxLength="4" placeholder="XXXX" required value={cardNumber3} onChange={(e) => setCardNumber3(e.target.value)} />
          <input type="text" maxLength="4" placeholder="XXXX" required value={cardNumber4} onChange={(e) => setCardNumber4(e.target.value)} />
        </div>
        <div className="card-details">
          <div className="expiry-date">
            <label htmlFor="expiry">Fecha de Caducidad</label>
            <input type="text" maxLength="5" id="expiry" placeholder="MM/AA" required value={expiryDate} onChange={handleExpiryDateChange} />
          </div>
          <div className="cvv">
            <label htmlFor="cvv">CVV</label>
            <input type="text" id="cvv" maxLength="3" placeholder="XXX" required value={cvv} onChange={(e) => setCvv(e.target.value)} />
          </div>
        </div>
      </div>

      <button className="pagar-btn" onClick={handlePagar}>
        Pagar <TbCoinFilled size={25} />
      </button>

      {showSuccess && (
        <div className="mensaje-emergente">
          <div className="modal-content">
            <p>Pago exitoso ¡Muchas gracias!</p>
            <button className="aceptar-btn" onClick={handleAceptarSuccess}>Aceptar</button>
          </div>
        </div>
      )}

      {showInsufficientMessage && (
        <div className="mensaje-emergente">
          <div className="modal-content">
            <p>Monto insuficiente, por favor vuelva a intentarlo.</p>
            <button className="aceptar-btn" onClick={handleAceptar}>Aceptar</button>
          </div>
        </div>
      )}

      {showIncompleteFieldsMessage && (
        <div className="mensaje-emergente">
          <div className="modal-content">
            <p>Por favor complete todos los campos.</p>
            <button className="aceptar-btn" onClick={handleAceptar}>Aceptar</button>
          </div>
        </div>
      )}

      {showInvalidCardMessage && (
        <div className="mensaje-emergente">
          <div className="modal-content">
            <p>Número de tarjeta inválida.</p>
            <button className="aceptar-btn" onClick={handleAceptar}>Aceptar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HighlightPost;
