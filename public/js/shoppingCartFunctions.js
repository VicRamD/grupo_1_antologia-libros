window.addEventListener('load', () => {
    let subtotales = document.querySelectorAll('.subtotal');
    let totalPrecio = document.querySelector('.total-precio');
    let inputsCantidad = document.querySelectorAll(".inp-cantidad");
    let valorTotal = 0;

    //console.log(inputsCantidad[0]);
    inputsCantidad.forEach(input => {
        input.addEventListener('keypress', (evt) => {
            let ASCIICode = (evt.which) ? evt.which : evt.keyCode
            if (ASCIICode < 48 && ASCIICode > 57);
                return false;
            return true;
        })
    })

    subtotales.forEach(subtotal => {
        //console.log(Number(subtotal.parentNode.childNodes[1].innerText.slice(1)))
        //console.log(subtotal.parentNode.childNodes[3].childNodes[5].value)
        subtotal.innerText = '$'+ Number(subtotal.parentNode.childNodes[1].innerText.slice(1))*Number(subtotal.parentNode.childNodes[3].childNodes[5].value);
        valorTotal += Number(subtotal.parentNode.childNodes[1].innerText.slice(1))*Number(subtotal.parentNode.childNodes[3].childNodes[5].value);
        //console.log(subtotal);
        
    });

    totalPrecio.innerHTML = '$' + valorTotal;
     
    //console.log(subtotales);
    //console.log(subtotales[0].parentNode.childNodes[1])
    //console.log(subtotales[0].parentNode.childNodes[3].childNodes[5])
});