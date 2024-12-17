document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.querySelector('.form-contacto');

    // Validación personalizada para email
    const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Función para obtener el mensaje de error según las restricciones del input
    const getErrorMessage = (input) => {
        if (input.validity.valueMissing) {
            return 'Este campo es obligatorio';
        }
        if (input.validity.tooShort) {
            return `Debe contener al menos ${input.minLength} caracteres`;
        }
        if (input.validity.tooLong) {
            return `Debe contener máximo ${input.maxLength} caracteres`;
        }
        if (input.validity.patternMismatch) {
            return input.title || 'El formato ingresado no es válido';
        }
        if (input.type === 'email' && !isEmailValid(input.value)) {
            return 'Por favor, ingresa un correo electrónico válido';
        }
        return '';
    };

    // Aplicar clases de validación y mostrar mensajes de error
    const applyValidationStyles = (input, isValid, message = '') => {
        const feedback = input.nextElementSibling;
        if (isValid) {
            input.classList.add('is-valid');
            input.classList.remove('is-invalid');
            if (feedback) feedback.style.display = 'none';
        } else {
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
            if (feedback) {
                feedback.textContent = message;
                feedback.style.display = 'block';
            } else {
                // Crear mensaje si no existe
                const newFeedback = document.createElement('div');
                newFeedback.classList.add('invalid-feedback');
                newFeedback.textContent = message || 'Este campo es obligatorio';
                input.parentNode.appendChild(newFeedback);
                newFeedback.style.display = 'block';
            }
        }
    };

    // Validar un campo específico
    const validateField = (input) => {
        const errorMessage = getErrorMessage(input);
        const isValid = input.checkValidity();
        applyValidationStyles(input, isValid, errorMessage);
        return isValid;
    };

    // Validar todo el formulario
    const validateForm = () => {
        let isValid = true;
        const inputs = contactForm.querySelectorAll('.form-control[required]');
        inputs.forEach(input => {
            const validField = validateField(input);
            if (!validField) isValid = false;
        });
        return isValid;
    };

    // Evento de envío del formulario
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar el envío predeterminado del formulario

        if (validateForm()) {
            Swal.fire({
                icon: 'success',
                title: 'Formulario enviado',
                text: 'Gracias por contactarnos. Te responderemos pronto.',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                contactForm.reset();
                const inputs = contactForm.querySelectorAll('.form-control');
                inputs.forEach(input => input.classList.remove('is-valid', 'is-invalid')); // Limpiar estilos
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error en el formulario',
                text: 'Por favor, revisa los campos marcados en rojo.',
                confirmButtonText: 'Corregir'
            });
        }
    });

    // Validación en tiempo real
    const inputs = contactForm.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.addEventListener('input', () => validateField(input));
    });
});
