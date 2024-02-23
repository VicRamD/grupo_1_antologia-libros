let nombreValido = false; 
    let apellidoValido = false; 
    let emailValido = false;
    let passwordValido = false; 
    let pwconfirmValido = false; 
    let avatarValido = true; //avatar valido empieza true al ser la imagen opcional

window.addEventListener('load', ()=>{
    const form = document.querySelector('form.contenedor-padre');
    const formerrors = document.getElementById('formerrors');
    //console.log(form);
    
    const firstname = document.getElementById('firstname');
    const lastname = document.getElementById('lastname');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const pwconfirm = document.getElementById('pwconfirm');

    const fnerrors = document.getElementById('fnerrors');
    const lnerrors = document.getElementById('lnerrors');

    const mailerrors = document.getElementById('mailerrors');

    const pwerrors = document.getElementById('pwerrors');
    const pw2errors = document.getElementById('pw2errors');

    const avatar = document.getElementById('avatar');
    const avatarerrors = document.getElementById('avatarerrors');

    //Nombre y apellido obligatorios de al menos 2 carácteres
    firstname.addEventListener('input', () => {
        if(hasReachedMinLength(firstname.value.trim(), 2)){
            fnerrors.innerHTML="";
            nombreValido = true;
        } else {
            fnerrors.innerHTML = "<small>El nombre debe tener 2 caracteres como minimo</small>";
            nombreValido = false;
        }
    });

    lastname.addEventListener('input', () => {
        if(hasReachedMinLength(lastname.value.trim(), 2)){
            lnerrors.innerHTML="";
            apellidoValido = true;
        } else {
            lnerrors.innerHTML = "<small>El apellido debe tener 2 caracteres como minimo</small>";
            apellidoValido = false;
        }
    });

    
    //Email obligatorio y valido
    email.addEventListener('change', () => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if(emailRegex.test(email.value)){
            mailerrors.innerHTML = "";
            emailValido = true;
        } else {
            mailerrors.innerHTML = "<small>Debe ingresar un email valido, por ejemplo juan.perez1@example.com</small>";
            emailValido = false;
        }
    })

    //Las contraseña debe tener minimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y un caracter especial.
    password.addEventListener('change', () => {
        let value = password.value;
        
        let errores = verifyPasswordExpresion(value);
        
        if(errores > 0) {
            pwerrors.innerHTML = "<small>La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula, un número y un carácter especial</small>";
            passwordValido = false;
        } else {
            pwerrors.innerHTML = "";
            passwordValido = true;
        }
    });

    pwconfirm.addEventListener('change', () => {
        let value = pwconfirm.value;
        
        let errores = verifyPasswordExpresion(value);
        
        if(errores > 0) {
            pw2errors.innerHTML = "<small>La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula, un número y un carácter especial<br>Ambas contraseñas deben ser iguales</small>";
            pwconfirmValido = false;
        } else {
            if(pwconfirm.value === password.value){
                pw2errors.innerHTML = "";
                pwconfirmValido = true;
            } else {
                pw2errors.innerHTML = "<small>Ambas contraseñas deben ser iguales</small>";
                pwconfirmValido = false;
            }

        }

       
    });

    //La imagen Deberá ser un archivo(JPG, JPEG, PNG, GIF).
    avatar.addEventListener('change', ()=>{
        const file = avatar.files[0];

        if (window.FileReader && window.Blob) {
            // All the File APIs are supported.
            //codigo para obtener cabeceras de archivo
            let header = "";
            let fileReader = new FileReader();
            let type;
            fileReader.onloadend = function(e){
                //Los Uint8Array representan un array de enteros sin signo de 8 bits.
                let arr = (new Uint8Array(e.target.result)).subarray(0, 4); 
                
                for(let i = 0; i < arr.length; i++) {
                    header += arr[i].toString(16);
                }
                //console.log("El header");
                //console.log(header);
                type = validarMimeType(header);
                //console.log("filereader " + type);

                if(type === "unknown"){
                    avatarerrors.innerHTML = "<small>Debe ingresar una imagen de los siguientes formatos (JPG, JPEG, PNG, GIF)</small>"
                    avatarValido = false;
                } else {
                    avatarerrors.innerHTML = "";
                    avatarValido = true;
                }
            };

            fileReader.readAsArrayBuffer(file);
            
        } else {
            // File and Blob are not supported
            if (file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png' 
            || file.type === 'image/gif'){
                avatarerrors.innerHTML = "";
                avatarValido = true;
            } else {
                avatarerrors.innerHTML = "<small>Debe ingresar una imagen de los siguientes formatos (JPG, JPEG, PNG, GIF)</small>";
                avatarValido = false;
            }
        }
    });

    form.addEventListener('submit', function(event){
        inputsValidados = [nombreValido, apellidoValido, emailValido, passwordValido, pwconfirmValido, avatarValido];
        console.log("En listener");
        inputsValidados.forEach(valor => {
            console.log("Valor booleano " + valor);
            if(!valor){
                console.log("En if de valor false");
                event.preventDefault();
                formerrors.innerHTML = "<small>Quedan campos por completar o con datos invalidos</small>";
            }
        });
        //return false;
    });
});

//==================================
//==================================
// Funciones auxiliares

function hasReachedMinLength(value, min){
    return (value.length >= min)
};

function verifyPasswordExpresion(value){
    let errores = 0;
        //search devuelve -1 si no encuentra valores de la expresión regular
        if(!hasReachedMinLength(value.trim(), 8)){
            errores++;
        } else if(value.search(/[a-z]/) < 0) {
            console.log(value.search(/[a-z]/));
            errores++;
        } else if(value.search(/[A-Z]/) < 0) {
            errores++;
        } else if(value.search(/[0-9]/) < 0) {
            console.log(value.search(/[0-9]/));
            errores++;
        } else if(value.search(/[A-Z]/) < 0) {
            errores++;
        } else if(value.search(/\W/) < 0) {
            //!@#\$%\^\&*\)\(+=._-
            //console.log(value.search(/\W/));
            errores++;
        }
    return errores;
}

function validarMimeType(header){
    let type;
    switch (header) {
        case "89504e47":
            console.log("png");
            type = "image/png";
            break;
        case "47494638":
            console.log("gif");
            type = "image/gif";
            break;
        case "ffd8ffe0":
            console.log("jpg");
            type = "image/jpg";
            break;
        case "ffd8ffe1":
        case "ffd8ffe2":
        case "ffd8ffe3":
        case "ffd8ffe8":
            console.log("jpeg");
            type = "image/jpeg";
            break;
        default:
            console.log("default");
            type = "unknown"; 
            break;

    }
    //console.log("antes de salir del switch " + type);
    return type;
}

 //validar en submit
/*function validateSubmit(evt){
    let inputsValidados = [nombreValido, apellidoValido, emailValido, passwordValido, pwconfirmValido, avatarValido];
    console.log("En listener");
    inputsValidados.forEach(valor => {
        console.log("Valor booleano " + valor);
        if(!valor){
            console.log("En if de valor false");
            return false;
        }
    });
    return false;
};*/