document.addEventListener('DOMContentLoaded', function() {
    // Función para formatear la fecha y hora en el formato DD/MM/AAAA - HH:MM
    function formatearFechaCompleta(fechaHora) {
        const partes = fechaHora.split(' - ');  // Separa la fecha de la hora
        if (partes.length === 2) {
            const fecha = partes[0].split('/');
            const hora = partes[1];
            if (fecha.length === 3) {
                const [dia, mes, anio] = fecha;
                return `${dia}/${mes}/${anio} - ${hora}`;  // Devuelve la fecha completa con hora
            }
        }
        return 'Fecha inválida';  // Si no tiene el formato correcto
    }

    // Obtener los datos desde sessionStorage
    const nombre = sessionStorage.getItem('nombre');
    const apellido = sessionStorage.getItem('apellido');
    const cedula = sessionStorage.getItem('cedula');
    const telefono = sessionStorage.getItem('telefono');
    const email = sessionStorage.getItem('email');
    const fechaHora = sessionStorage.getItem('fecha');

    // Asignar los valores a los elementos si existen
    if (nombre) {
        document.getElementById('prev-nombre').textContent = nombre;
    }
    if (apellido) {
        document.getElementById('prev-apellido').textContent = apellido;
    }
    if (cedula) {
        document.getElementById('prev-cedula').textContent = cedula;
    }
    if (telefono) {
        document.getElementById('prev-telefono').textContent = telefono;
    }
    if (email) {
        document.getElementById('prev-email').textContent = email;
    }

    // Asegurarse de que la fecha esté en el formato correcto
    if (fechaHora) {
        // Mostrar la fecha formateada
        document.getElementById('prev-fecha').textContent = formatearFechaCompleta(fechaHora);
    }

    // Asegurarse de que el botón esté en el DOM antes de agregar el event listener
    const botonConfirmar = document.getElementById('btn_confirmarReserva');
    if (botonConfirmar) {
        botonConfirmar.addEventListener('click', confirmarReserva);
    }
});

// Función para confirmar la reserva
function confirmarReserva() {
    Swal.fire({
        title: 'Reserva Confirmada',
        text: 'Tu reserva ha sido confirmada exitosamente. Se te ha enviado un Mail con todos los detalles.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Redirigir a la página de agenda después de la confirmación
            window.location.href = 'Agendarse.html';
        }
    });
}
