import React, { useState, useEffect } from 'react';
import { useLocation, Link } from "wouter";
import { getAllCategorias, getAllSucursales, getUserInfo } from '../api/trueque.api';
import axios from 'axios';

function Historial() {

    return (
        <div>
            <h1> HISTORIAL </h1>
        </div>
    );
}

export default Historial;
