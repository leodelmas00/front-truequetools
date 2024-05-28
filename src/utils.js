export function formatFecha(fecha) {
    const fechaFormateada = new Date(fecha).toLocaleString('es-ES', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',

    });
    return `Publicado el ${fechaFormateada}hs`;
}

export function formatFechaHistorial(fecha) {
    const fechaFormateada = new Date(fecha).toLocaleString('es-ES', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',

    });
    return `${fechaFormateada}`;
}
