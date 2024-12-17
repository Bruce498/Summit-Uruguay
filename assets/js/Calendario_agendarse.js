    document.addEventListener('DOMContentLoaded', function () {
        const calendarioEl = document.getElementById('calendario');
        const campoFecha = document.getElementById('fecha');
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

                // Deshabilitar días pasados
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
                    calendario.unselect(); // Deselecciona la fecha
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

                campoFecha.value = fechaSeleccionada;
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

        calendario.render(); // Renderizar el calendario

        // Escuchar evento de envío del formulario
        document.querySelector('.form-agenda').addEventListener('submit', function (event) {
            event.preventDefault(); // Evita que el formulario recargue la página
            guardarDatos();
        });        

        // Función para formatear la fecha a DD/MM/AAAA - HH:MM
        function formatearFechaHora(date) {
            const dia = String(date.getDate()).padStart(2, '0');
            const mes = String(date.getMonth() + 1).padStart(2, '0');
            const anio = date.getFullYear();
            const hora = String(date.getHours()).padStart(2, '0');
            const minutos = String(date.getMinutes()).padStart(2, '0');
            return `${dia}/${mes}/${anio} - ${hora}:${minutos}`;
        }

        // Función para guardar los datos del formulario
        function guardarDatos() {
            const nombre = document.getElementById('Nombre').value;
            const apellido = document.getElementById('Apellido').value;
            const cedula = document.getElementById('Cedula').value;
            const telefono = document.getElementById('Telefono').value;
            const email = document.getElementById('Email').value;
            const fecha = sessionStorage.getItem('fecha');

            // Guardar los datos en sessionStorage
            sessionStorage.setItem('nombre', nombre);
            sessionStorage.setItem('apellido', apellido);
            sessionStorage.setItem('cedula', cedula);
            sessionStorage.setItem('telefono', telefono);
            sessionStorage.setItem('email', email);
            sessionStorage.setItem('fecha', fecha);

            // Redirigir a la página de confirmación
            window.location.href = 'Confirmacion_reserva.html';
        }
    });
