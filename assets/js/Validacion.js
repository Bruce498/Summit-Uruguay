document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.querySelector('.form-agenda');
    const inputs = formulario.querySelectorAll('input:not([type="submit"])');
    const campoEmail = formulario.querySelector('#Email'); // Campo de correo
    const campoFecha = formulario.querySelector('#fecha'); // Campo de fecha

    // Asegurarse de que el campo de fecha no tenga un valor predeterminado
    if (campoFecha) {
        campoFecha.value = ''; // Vaciar el valor del campo de fecha
    }

    // Validación en el envío del formulario
    formulario.addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar envío predeterminado

        let esValido = true;

        inputs.forEach(input => {
            const mensajeError = validarCampo(input);

            if (mensajeError) {
                mostrarError(input, mensajeError);
                esValido = false;
            } else {
                limpiarError(input);
            }
        });

        if (esValido) {
            Swal.fire({
                icon: 'success',
                title: 'Formulario enviado',
                text: 'Los datos han sido registrados correctamente.',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                formulario.submit(); // Enviar formulario si todo está correcto
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Errores en el formulario',
                text: 'Por favor, corrige los campos marcados en rojo.',
                confirmButtonText: 'Corregir'
            });
        }
    });

    // Validación en tiempo real
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            const mensajeError = validarCampo(input);

            if (mensajeError) {
                mostrarError(input, mensajeError);
            } else {
                limpiarError(input);
            }
        });
    });

    // Función: Validar un campo específico
    function validarCampo(campo) {
        const valor = campo.value.trim();

        // Validar si el campo está vacío
        if (!valor) return 'Este campo es obligatorio.';

        // Validar longitud mínima
        if (campo.minLength && valor.length < campo.minLength) {
            return `Debe tener al menos ${campo.minLength} caracteres.`;
        }

        // Validar longitud máxima
        if (campo.maxLength && valor.length > campo.maxLength) {
            return `No puede tener más de ${campo.maxLength} caracteres.`;
        }

        // Validar formato con patrón (solo letras y espacios)
        if (campo.pattern && !new RegExp(campo.pattern).test(valor)) {
            return campo.title || 'Formato no válido.';
        }

        // Validar correo electrónico
        if (campo.type === 'email') {
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!emailRegex.test(valor)) {
                return 'Por favor, ingresa un correo electrónico válido.';
            }
        }

        // Validar número de teléfono (9 dígitos)
        if (campo.id === 'Telefono' && !/^\d{9}$/.test(valor)) {
            return 'El teléfono debe contener 9 dígitos.';
        }

        // Validar Cédula (máximo 12 caracteres)
        if (campo.id === 'Cedula' && valor.length < 8) {
            return 'La cédula debe tener al menos 8 dígitos.';
        }

        // Validar fecha
        if (campo.id === 'fecha' && !valor) {
            return 'La fecha y hora son obligatorias.';
        }

        return null;
    }

    // Función: Mostrar error en un campo
    function mostrarError(campo, mensaje) {
        campo.classList.add('is-invalid');
        let mensajeError = campo.nextElementSibling;

        if (!mensajeError || !mensajeError.classList.contains('invalid-feedback')) {
            mensajeError = document.createElement('div');
            mensajeError.className = 'invalid-feedback';
            campo.parentNode.appendChild(mensajeError);
        }

        mensajeError.textContent = mensaje;
        mensajeError.style.display = 'block';
    }

    // Función: Limpiar errores de un campo
    function limpiarError(campo) {
        campo.classList.remove('is-invalid');
        campo.classList.add('is-valid');

        const mensajeError = campo.nextElementSibling;
        if (mensajeError && mensajeError.classList.contains('invalid-feedback')) {
            mensajeError.style.display = 'none';
        }
    }
});
