window.addEventListener('load', function() {
    const form = document.querySelector('.productAddForm');
    const title = document.querySelector('#title');
    const labelTitle = document.querySelector('#labelTitle');
    const abstract = document.querySelector('#abstract');
    const labelAbstract = document.querySelector('#labelAbstract');
    const image = document.querySelector('#image');
    const labelImage = document.querySelector('#labelImage');
    


    title.addEventListener("blur", () => {
        if (title.value.length < 5){
            labelTitle.textContent = "El título debe tener al menos 5 caracteres";
        } else {
            labelTitle.textContent = '';
        }
    })

    title.addEventListener("input", ()=>{
        if (title.value.length>4){
            labelTitle.textContent = "";
        }
    })

    abstract.addEventListener("blur", () => {
        if (abstract.value.length < 20){
            labelAbstract.textContent = "El resumen debe tener al menos 20 caracteres";
        } else {
            labelAbstract.textContent = '';
        }
    })

    abstract.addEventListener("input", () => {
        if (abstract.value.length>19){
            labelAbstract.textContent = "";
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
                labelImage.textContent = '';
            } else {
                labelImage.textContent = 'Sólo se permiten imágenes jpg, jpeg, png o gif ';
            }
        }
      }

      image.addEventListener("change", () => {
        console.log(image.value);
        checkImage(image);

      })

      form.addEventListener('submit', function(event) {
        if (title.value.trim().length < 5) {
            //labelTitle.textContent = 'El título debe tener al menos 5 caracteres';
            event.preventDefault();
        }

        if (abstract.value.trim().length < 20) {
            //labelAbstract.textContent = 'El resumen debe tener al menos 20 caracteres';
            event.preventDefault();
        }

        const file = image.files[0];
        if (!file) {
            labelImage.textContent = 'Debe seleccionar una imagen';
            event.preventDefault();
        } else {
            const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
            if (!allowedTypes.includes(file.type)) {
                labelImage.textContent = 'Sólo se permiten imágenes jpg, jpeg, png o gif';
                event.preventDefault();
            }
        }
    });

})