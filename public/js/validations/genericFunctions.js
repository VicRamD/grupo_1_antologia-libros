function onlyNumberKey(evt){
    let ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode < 48 || ASCIICode > 57)
        return false;
    return true;
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