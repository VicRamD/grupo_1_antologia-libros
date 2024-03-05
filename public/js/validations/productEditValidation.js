window.addEventListener('load', function() {
    const form = document.querySelector('.productEditForm');
    const title = document.querySelector('#title');
    const titleError = document.querySelector('#titleError');
    const abstract = document.querySelector('#abstract');
    const abstractError = document.querySelector('#abstractError');
    const image = document.querySelector('#image');
    const imageError = document.querySelector('#imageError');
    const price = document.querySelector('#price');
    const priceError = document.querySelector('#priceError');

    title.addEventListener("blur", () => {
        if (title.value.trim().length < 5) {
            titleError.textContent = 'Debe tener al menos 5 caracteres';
        } else {
            titleError.textContent = '';
        }
    });

    abstract.addEventListener("blur", () => {
        if (abstract.value.trim().length < 20) {
            abstractError.textContent = 'Debe tener al menos 20 caracteres';
        } else {
            abstractError.textContent = '';
        }
    });

    price.addEventListener("blur", () => {
        if (price.value.trim() === '') {
            priceError.textContent = 'El valor del precio es obligatorio';
        } else {
            priceError.textContent = '';
        }
    });

    image.addEventListener("change", () => {
        const file = image.files[0];
        if (!file) {
            imageError.textContent = 'Debe seleccionar una imagen';
            return;
        }
        const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            imageError.textContent = 'Sólo se permiten imágenes jpg, jpeg, png o gif';
        } else {
            imageError.textContent = '';
        }
    });

    form.addEventListener('submit', function(event) {
        if (title.value.trim().length < 5) {
            titleError.textContent = 'Debe tener al menos 5 caracteres';
            event.preventDefault();
        }

        if (abstract.value.trim().length < 20) {
            abstractError.textContent = 'Debe tener al menos 20 caracteres';
            event.preventDefault();
        }

        if (price.value.trim() === '') {
            priceError.textContent = 'El valor del precio es obligatorio';
            event.preventDefault();
        }

        const file = image.files[0];
        if (!file) {
            imageError.textContent = 'Debe seleccionar una imagen';
            event.preventDefault();
        } else {
            const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
            if (!allowedTypes.includes(file.type)) {
                imageError.textContent = 'Sólo se permiten imágenes jpg, jpeg, png o gif';
                event.preventDefault();
            }
        }
    });
});