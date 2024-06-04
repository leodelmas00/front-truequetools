export function formatFecha(fecha) {
    const fechaFormateada = new Date(fecha).toLocaleString('es-ES', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'America/Buenos_Aires',
    });
    return `${fechaFormateada}hs`;
}

export function formatFechaSolicitud(fecha) {
    const fechaFormateada = new Date(fecha);
    fechaFormateada.setUTCHours(fechaFormateada.getUTCHours()); // Ajustar a la zona horaria de Buenos Aires (UTC+3)
    const options = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'America/Buenos_Aires',
    };
    const fechaFormateadaString = fechaFormateada.toLocaleString('es-ES', options);
    return `${fechaFormateadaString}hs`;
}

export function formatFechaHistorial(fecha) {
    const fechaFormateada = new Date(fecha).toLocaleString('es-ES', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        timeZone: 'America/Buenos_Aires',
    });
    return `${fechaFormateada}`;
}
