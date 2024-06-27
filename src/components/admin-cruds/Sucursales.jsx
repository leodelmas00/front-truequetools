import { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../api/trueque.api";
import { Link } from "wouter";
import '../../styles/Sucursales.css';

export default function Sucursales() {
    const [sucursales, setSucursales] = useState([]);
    const [selectedSucursal, setSelectedSucursal] = useState(null);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        async function loadSucursales() {
            try {
                const response = await axios.get(`${baseURL}adminview/sucursales/`, {
                    params: { q: query }
                });
                if (query) {
                    setSearchResults(response.data);
                } else {
                    setSucursales(response.data);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        loadSucursales();
    }, [query]);

    const handleSearchChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        setSearchPerformed(true);
        try {
            const response = await axios.get(`${baseURL}adminview/sucursales/`, {
                params: { q: query }
            });
            setSearchResults(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error during search:', error);
        }
    };

    const sucursalesToDisplay = searchPerformed ? searchResults : sucursales;

    return (
        <div className="sucursales-container">
            <div className="sucursales-box">
                <h1 className="sucursales-title">Lista de Sucursales</h1>
                <hr />
                <div className="sucursales-search">
                    <input
                        className="sucursales-search-input"
                        placeholder="Ingresa el nombre de la sucursal"
                        type="text"
                        value={query}
                        onChange={handleSearchChange}
                    />
                    <button onClick={handleSearchSubmit}>Buscar</button>
                </div>
                <div className="sucursales-box-content">
                    {sucursalesToDisplay.map(sucursal => (
                        <div key={sucursal.id} className='sucursales-select-box'>
                            {sucursal.nombre} - {sucursal.direccion}
                            <Link key={sucursal.id} to={`/SucursalEdit/${sucursal.id}`}>
                                <button className='sucursales-edit'>Editar</button>
                            </Link>
                        </div>
                    ))}
                </div>
                <div className="sucursales-buttons">
                    <Link to="/EmployeeView" >
                        <button>Volver</button>
                    </Link>
                    <Link to="/adminview/sucursales/add" >
                        <button>Agregar sucursal</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
