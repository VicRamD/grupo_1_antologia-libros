function onlyNumberKey(evt){
    // Only ASCII character in that range allowed
    let ASCIICode = (evt.which) ? evt.which : evt.keyCode
};

function onlyLetterKey(evt){
    // Solo permite caracteres ASCII en el rango
    let ASCIICode = (evt.which) ? evt.which : evt.keyCode;
    //console.log(ASCIICode);
    if (ASCIICode == 32 || (ASCIICode >= 65 && ASCIICode <= 90) || (ASCIICode >= 97 && ASCIICode <= 122) || ASCIICode == 130 
    || (ASCIICode >= 160 && ASCIICode <= 165)){
        return true;
    } else {
        return false;
    }
    
}