window.addEventListener('load', () => {
    let subtotales = document.querySelectorAll('.subtotal');
    let totalPrecio = document.querySelector('.total-precio');
    let inputsCantidad = document.querySelectorAll(".inp-cantidad");

    let inputsMas = document.querySelectorAll(".btn-cant[value='+']");
    let inputsMenos = document.querySelectorAll(".btn-cant[value='-']");

    //console.log(inputsMas[1]);
    inputsCantidad.forEach(input => {
        input.addEventListener('keypress', (evt) => {
            //console.log(evt.which)
            let ASCIICode = (evt.which) ? evt.which : evt.keyCode
            if (ASCIICode < 48 || ASCIICode > 57){
                evt.preventDefault();
                return false;
            } else {
                return true;
            }    
        });
        input.addEventListener('input', (evt) => {
            if(input.value === ''){
                input.value = 0;
            }
        });
    })

    subtotales.forEach(subtotal => {
        //console.log(Number(subtotal.parentNode.childNodes[1].innerText.slice(1)))
        //console.log(subtotal.parentNode.childNodes[3].childNodes[5].value)
        calcularSubtotal(subtotal);
        //subtotal.innerText = '$'+ Number(subtotal.parentNode.childNodes[1].innerText.slice(1))*Number(subtotal.parentNode.childNodes[3].childNodes[5].value);
        
        //console.log(subtotal);
        
    });

    totalPrecio.innerHTML = '$' + calcularTotal(subtotales);

    inputsMas.forEach(mas => {
        mas.addEventListener('click', () => {
            //console.log(mas.parentNode.childNodes[5].value);
            mas.parentNode.childNodes[5].value = Number(mas.parentNode.childNodes[5].value) + 1;
            calcularSubtotal(mas.parentNode.parentNode.childNodes[5]);
            totalPrecio.innerHTML = calcularTotal(subtotales);
        })
    });

    inputsMenos.forEach(menos => {
        menos.addEventListener('click', () => {
            //console.log(mas.parentNode.childNodes[5].value);
            if(Number(menos.parentNode.childNodes[5].value) > 0){
                menos.parentNode.childNodes[5].value = Number(menos.parentNode.childNodes[5].value) - 1;
                calcularSubtotal(menos.parentNode.parentNode.childNodes[5]);
                totalPrecio.innerHTML = '$'+ calcularTotal(subtotales);
            }
        })
    })
     
});


function calcularSubtotal(subtotal){
    subtotal.innerText = '$'+ Number(subtotal.parentNode.childNodes[1].innerText.slice(1))*Number(subtotal.parentNode.childNodes[3].childNodes[5].value);
}

function calcularTotal(subtotales){
    let valorTotal = 0;
    subtotales.forEach(subtotal => {
        valorTotal += Number(subtotal.parentNode.childNodes[1].innerText.slice(1))*Number(subtotal.parentNode.childNodes[3].childNodes[5].value);
    });
    return valorTotal;
}