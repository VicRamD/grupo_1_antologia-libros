window.addEventListener('load', function() {
    const form = document.querySelector('.productAddForm');
    const title = document.querySelector('#title');
    const errorTitle = document.querySelector('#errorTitle');
    const abstract = document.querySelector('#abstract');
    const errorAbstract = document.querySelector('#errorAbstract');
    const image = document.querySelector('#image');
    const errorImage = document.querySelector('#errorImage');
    


    title.addEventListener("blur", () => {
        if (title.value.length < 5){
            errorTitle.textContent = "El título debe tener al menos 5 caracteres";
        } else {
            errorTitle.textContent = '';
        }
    })

    title.addEventListener("input", () => {
        if (title.value.length>4){
            errorTitle.textContent = "";
        }
    })

    abstract.addEventListener("blur", () => {
        if (abstract.value.length < 20){
            errorAbstract.textContent = "El resumen debe tener al menos 20 caracteres";
        } else {
            errorAbstract.textContent = '';
        }
    })

    abstract.addEventListener("input", () => {
        if (abstract.value.length>19){
            errorAbstract.textContent = "";
        }
    })

    function checkImage(input) {
        const file = input.files[0];
      
        if (file) {
         // const tipoPermitido = /^image\//; // Verifica si el tipo comienza con "image/"

          console.log("Filename: " + file.name);
          console.log("Type: " + file.type);
          console.log("Size: " + file.size + " bytes");

          if (file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png' 
            || file.type === 'image/gif'){
                errorImage.textContent = '';
            } else {
                errorImage.textContent = 'Sólo se permiten imágenes jpg, jpeg, png o gif ';
            }
        }
      }

      image.addEventListener("change", () => {
        console.log(image.value);
        checkImage(image);

      })

      form.addEventListener('submit', function(event) {
        if (title.value.trim().length < 5) {
            //errorTitle.textContent = 'El título debe tener al menos 5 caracteres';
            event.preventDefault();
        }

        if (abstract.value.trim().length < 20) {
            //errorAbstract.textContent = 'El resumen debe tener al menos 20 caracteres';
            event.preventDefault();
        }

        const file = image.files[0];
        if (!file) {
            errorImage.textContent = 'Debe seleccionar una imagen';
            event.preventDefault();
        } else {
            const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
            if (!allowedTypes.includes(file.type)) {
                errorImage.textContent = 'Sólo se permiten imágenes jpg, jpeg, png o gif';
                event.preventDefault();
            }
        }
    });

})