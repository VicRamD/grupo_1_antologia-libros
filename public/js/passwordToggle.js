window.addEventListener('load', function() {
    const passwordInput = document.querySelector('input.pass');
    const togglePasswordBtn = document.querySelector('.password-toggle-btn');

    togglePasswordBtn.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        if (type === 'password') {
            togglePasswordBtn.innerHTML = '<i class="far fa-eye"></i>';
        } else {
            togglePasswordBtn.innerHTML = '<i class="far fa-eye-slash"></i>';
        }
    });
});
