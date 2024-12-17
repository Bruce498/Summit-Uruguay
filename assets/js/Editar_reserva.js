document.addEventListener('DOMContentLoaded', function () {
    // Asegurarse de que los elementos del formulario existan antes de intentar acceder a ellos
    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const cedulaInput = document.getElementById('cedula');
    const telefonoInput = document.getElementById('telefono');
    const emailInput = document.getElementById('email');
    const campoFecha = document.getElementById('fecha');

    // Verificar si los elementos existen antes de asignarles valores
    if (nombreInput) nombreInput.value = sessionStorage.getItem('nombre') || '';
    if (apellidoInput) apellidoInput.value = sessionStorage.getItem('apellido') || '';
    if (cedulaInput) cedulaInput.value = sessionStorage.getItem('cedula') || '';
    if (telefonoInput) telefonoInput.value = sessionStorage.getItem('telefono') || '';
    if (emailInput) emailInput.value = sessionStorage.getItem('email') || '';
    if (campoFecha) campoFecha.value = sessionStorage.getItem('fecha') || '';

    // Configurar FullCalendar
    const calendarioEl = document.getElementById('calendario');
    const hoy = new Date();

    const calendario = new FullCalendar.Calendar(calendarioEl, {
        initialView: 'timeGridWeek',
        locale: 'es',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridWeek'
        },
        buttonText: {
            today: 'Hoy',
            week: 'Semana'
        },
        slotDuration: '00:15:00',
        slotMinTime: '15:00:00',
        slotMaxTime: '20:30:00',
        allDaySlot: false,
        selectable: true,
        slotLabelFormat: {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        },
        dayCellDidMount: function (info) {
            const fechaActual = info.date.toISOString().split('T')[0];
            const fechaHoy = hoy.toISOString().split('T')[0];

            if (fechaActual < fechaHoy) {
                info.el.classList.add('dia-no-disponible');
                info.el.style.pointerEvents = 'none';
            } else {
                info.el.classList.add('dia-disponible');
            }
        },
        select: function (info) {
            const fechaSeleccionada = formatearFechaHora(info.start);

            if (info.start < hoy) {
                Swal.fire({
                    title: 'Día no disponible',
                    text: 'No puedes seleccionar días anteriores a la fecha actual.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
                calendario.unselect();
                return;
            }

            const horaSeleccionada = info.start.getHours();
            if (horaSeleccionada < 15 || horaSeleccionada >= 21) {
                Swal.fire({
                    title: 'Hora no disponible',
                    text: 'La hora seleccionada no está disponible para reserva.',
                    icon: 'warning',
                    confirmButtonText: 'Aceptar'
                });
                calendario.unselect();
                return;
            }

            if (campoFecha) campoFecha.value = fechaSeleccionada;
            sessionStorage.setItem('fecha', fechaSeleccionada);
            Swal.fire({
                title: 'Hora seleccionada',
                text: 'Has seleccionado el ' + fechaSeleccionada,
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
            calendario.unselect();
        }
    });

    calendario.render();

    // Función para formatear fecha y hora
    function formatearFechaHora(date) {
        const dia = String(date.getDate()).padStart(2, '0');
        const mes = String(date.getMonth() + 1).padStart(2, '0');
        const anio = date.getFullYear();
        const hora = String(date.getHours()).padStart(2, '0');
        const minutos = String(date.getMinutes()).padStart(2, '0');
        return `${dia}/${mes}/${anio} - ${hora}:${minutos}`;
    }

    // Manejar envío del formulario
    const form = document.getElementById('form-editar');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Guardar datos editados en sessionStorage
            sessionStorage.setItem('nombre', nombreInput ? nombreInput.value : '');
            sessionStorage.setItem('apellido', apellidoInput ? apellidoInput.value : '');
            sessionStorage.setItem('cedula', cedulaInput ? cedulaInput.value : '');
            sessionStorage.setItem('telefono', telefonoInput ? telefonoInput.value : '');
            sessionStorage.setItem('email', emailInput ? emailInput.value : '');
            sessionStorage.setItem('fecha', campoFecha ? campoFecha.value : '');

            Swal.fire({
                icon: 'success',
                title: 'Reserva actualizada',
                text: 'Los datos han sido actualizados correctamente.',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                window.location.href = 'Confirmacion_reserva.html';
            });
        });
    }
});
