document.addEventListener('DOMContentLoaded', function() {
    // Validación para formulario de contacto
    const contactoForm = document.getElementById('contacto-form');
    if (contactoForm) {
        contactoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nombre = document.getElementById('nombre');
            const email = document.getElementById('email');
            const mensaje = document.getElementById('mensaje');
            let isValid = true;
            
            // Validar nombre
            if (nombre.value.trim() === '') {
                mostrarError(nombre, 'Por favor ingresa tu nombre');
                isValid = false;
            } else {
                removerError(nombre);
            }
            
            // Validar email
            if (email.value.trim() === '') {
                mostrarError(email, 'Por favor ingresa tu correo electrónico');
                isValid = false;
            } else if (!validarEmail(email.value)) {
                mostrarError(email, 'Por favor ingresa un correo electrónico válido');
                isValid = false;
            } else {
                removerError(email);
            }
            
            // Validar mensaje
            if (mensaje.value.trim() === '') {
                mostrarError(mensaje, 'Por favor ingresa tu mensaje');
                isValid = false;
            } else {
                removerError(mensaje);
            }
            
            if (isValid) {
                // Aquí iría el envío del formulario
                console.log('Formulario válido, enviando...');
                
                // Mostrar mensaje de éxito
                const successMessage = document.createElement('div');
                successMessage.className = 'mt-4 p-4 bg-green-100 text-green-700 rounded-lg';
                successMessage.textContent = 'Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto contigo pronto.';
                
                const formContainer = contactoForm.parentElement;
                formContainer.insertBefore(successMessage, contactoForm.nextSibling);
                
                // Resetear formulario
                contactoForm.reset();
                
                // Ocultar mensaje después de 5 segundos
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    }
    
    // Validación para formulario de login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const usuario = document.getElementById('usuario');
            const password = document.getElementById('password');
            let isValid = true;
            
            // Validar usuario
            if (usuario.value.trim() === '') {
                mostrarError(usuario, 'Por favor ingresa tu usuario');
                isValid = false;
            } else {
                removerError(usuario);
            }
            
            // Validar contraseña
            if (password.value.trim() === '') {
                mostrarError(password, 'Por favor ingresa tu contraseña');
                isValid = false;
            } else if (password.value.length < 6) {
                mostrarError(password, 'La contraseña debe tener al menos 6 caracteres');
                isValid = false;
            } else {
                removerError(password);
            }
            
            if (isValid) {
                // Aquí iría el envío del formulario
                console.log('Formulario de login válido, enviando...');
                loginForm.submit();
            }
        });
    }
    
    // Función para validar email
    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Función para mostrar errores
    function mostrarError(input, mensaje) {
        const formControl = input.closest('.form-group') || input.parentElement;
        const errorText = formControl.querySelector('.error-text') || document.createElement('small');
        
        errorText.className = 'error-text block mt-1 text-red-600 text-sm';
        errorText.textContent = mensaje;
        
        if (!formControl.querySelector('.error-text')) {
            formControl.appendChild(errorText);
        }
        
        input.classList.add('border-red-600');
        input.classList.remove('border-gray-300');
    }
    
    // Función para remover errores
    function removerError(input) {
        const formControl = input.closest('.form-group') || input.parentElement;
        const errorText = formControl.querySelector('.error-text');
        
        if (errorText) {
            errorText.remove();
        }
        
        input.classList.remove('border-red-600');
        input.classList.add('border-gray-300');
    }
});