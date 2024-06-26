import { useState, useEffect } from "react";
//import { baseURL, getAllVentas } from "../../api/trueque.api";
import { Link } from 'wouter'
import '../../styles/Ventas.css';

export default function Ventas() {
    //const [ventas, setVentas] = useState([]);
    //const [searchPerformed, setSearchPerformed] = useState(false);
    //const [searchResults, setSearchResults] = useState([]);

    {/*
    useEffect(() => {
        async function loadVentas() {
            const res = await getAllVentas();
            console.log(res.data);
            setVentas(res.data);
        }
        loadVentas();
    }, []);
    */}

    return (
        <div className="venta-container">
            <div className="venta-box">
                <h1 className="venta-title">Lista de Ventas</h1>
                <hr />
                <div className="venta-box-content">
                    Aqui se mostrarian todas las ventas!
                    {/*
                    {ventas.map(venta => (
                        <div key={venta.id} className='venta-select-box'>
                            {venta.producto}
                        </div>
                    ))}
                    */}
                </div>
                <div className="venta-buttons">
                    <Link to="/EmployeeView" >
                        <button >Volver</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}