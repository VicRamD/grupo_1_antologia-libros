window.addEventListener('load', ()=>{
    const form = document.querySelector('form');

    //Nombre y apellido obligatorios de al menos 2 carácteres
    const firstname = document.getElementById('firstname');
    const lastname = document.getElementById('lastname');
    const password = document.getElementById('password');
    const pwconfirm = document.getElementById('pwconfirm');

    const fnerrors = document.getElementById('fnerrors');
    const lnerrors = document.getElementById('lnerrors');

    const pwerrors = document.getElementById('pwerrors');
    const pw2errors = document.getElementById('pw2errors');

    firstname.addEventListener('input', () => {
        if(hasReachedMinLength(firstname.value.trim(), 2)){
            fnerrors.innerHTML="";
        } else {
            if(fnerrors.innerHTML === ""){
                fnerrors.innerHTML = "<small>El nombre debe tener 2 caracteres</small>";
            }
        }
    });

    lastname.addEventListener('input', () => {
        if(hasReachedMinLength(lastname.value.trim(), 2)){
            lnerrors.innerHTML="";
        } else {
            lnerrors.innerHTML = "<small>El apellido debe tener 2 caracteres</small>";
        }
    });

    password.addEventListener('change', (e) => {
        let value = password.value;
        
        let errores = verifyPasswordExpresion(value);
        
        if(errores > 0) {
            pwerrors.innerHTML = "<small>La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula, un número y un carácter especial</small>";
        } else {
            pwerrors.innerHTML = "";
        }
    });

    pwconfirm.addEventListener('change', (e) => {
        let value = pwconfirm.value;
        
        let errores = verifyPasswordExpresion(value);
        
        if(errores > 0) {
            pw2errors.innerHTML = "<small>La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula, un número y un carácter especial<br>Ambas contraseñas deben ser iguales</small>";
        } else {
            if(pwconfirm.value === password.value){
                pw2errors.innerHTML = "";
            } else {
                pw2errors.innerHTML = "<small>Ambas contraseñas deben ser iguales</small>";
            }

        }
    });
});

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
            console.log(value.search(/\W/));
            errores++;
        }
    return errores;
}