/*○ Nombre
■ Obligatorio.
■ Deberá tener al menos 5 caracteres.
○ Descripción
■ Deberá tener al menos 20 caracteres.
○ Imagen
■ Deberá ser un archivo válido (JPG, JPEG, PNG, GIF).*/
window.addEventListener('load', function() {
    title = document.querySelector('#title');
    labelTitle = document.querySelector('#labelTitle');
    abstract = document.querySelector('#abstract');
    labelAbstract = document.querySelector('#labelAbstract');
    image = document.querySelector('#image');
    labelImage = document.querySelector('#labelImage');
    


    title.addEventListener("blur", ()=>{
        if (title.value.length<5){
            labelTitle.textContent = "El título debe tener al menos 5 caracteres";
        }
    })

    title.addEventListener("input", ()=>{
        if (title.value.length>4){
            labelTitle.textContent = "";
        }
    })

    abstract.addEventListener("blur", ()=>{
        if (abstract.value.length<20){
            labelAbstract.textContent = "El resúmen debe tener al menos 20 caracteres";
        } 
    })

    abstract.addEventListener("input", ()=>{
        if (abstract.value.length>19){
            labelAbstract.textContent = "";
        }
    })

    function verificarImagen(input) {
        const archivo = input.files[0];
      
        if (archivo) {
         // const tipoPermitido = /^image\//; // Verifica si el tipo comienza con "image/"

          console.log("Filename: " + archivo.name);
          console.log("Type: " + archivo.type);
          console.log("Size: " + archivo.size + " bytes");

          if (archivo.type === 'image/jpg' || archivo.type === 'image/jpeg' || archivo.type === 'image/png' 
            || archivo.type === 'image/gif'){
                labelImage.textContent = '';
            } else {
                labelImage.textContent = 'Sólo se permiten imágenes jpg, jpeg, png o gif ';
            }
        }
      }

      image.addEventListener("change", ()=>{
        console.log(image.value);
        verificarImagen(image);

      })

})