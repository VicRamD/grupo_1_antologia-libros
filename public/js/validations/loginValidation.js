window.addEventListener('load', function() {
    const form = document.querySelector('.login-form');
    const email = document.querySelector('#email');
    const emailError = document.querySelector('#emailError');
    const password = document.querySelector('#password');
    const passwordError = document.querySelector('#passwordError');
    
    form.addEventListener('submit', function(event) {
        const emailRegex = /^\S+@\S+\.\S+$/; //Expresión regular para validar email

        //Validación email
        if (email.value.trim() === '') {
            emailError.innerText = 'El campo Email es obligatorio.';
            event.preventDefault();
        } else if (!emailRegex.test(email.value.trim())) {
            emailError.innerText = 'Por favor, ingrese un email válido.';
            event.preventDefault();
        } else {
            emailError.innerText = '';
        }

        // Validación contraseña
        if (password.value.trim() === '') {
            passwordError.innerText = 'El campo Contraseña es obligatorio.';
            event.preventDefault();
        } else {
            passwordError.innerText = '';
        }
    });
});