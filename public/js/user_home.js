window.addEventListener('load', ()=> {

    const url = "https://www.universal-tutorial.com/api/states/";

    const countriesSelect = document.getElementById('country');
    const statesSelect = document.getElementById('state');

    console.log(countriesSelect.value);
    if(countriesSelect.value){
        let countryOpt = document.querySelector(`option[value="${countriesSelect.value}"]`);
        console.log(countryOpt);
        console.log(countryOpt.dataset.stateFromCountry);

        statesSelect.innerHTML = "<option value='' disabled>Selecciona un opción</option>";
        let countryEndPoint = url + countriesSelect.value;
        fetch(countryEndPoint, {
            method: 'GET',
            headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJmcmFudmljdG9yMThAZ21haWwuY29tIiwiYXBpX3Rva2VuIjoieTFCSnNGYXk1Mm1sdE9uV2FiVmN6emxfOWVxOGpUdk9NaFhTVHhPVWdqdWpmakJ5M0JXbkRJcjNOZy1IbVp4N3BVVSJ9LCJleHAiOjE3MDgwOTQzODB9.RyL6bd7SamMjwH8ScjMK78RtGOIJu4cRCAAcWrUsUac",
                    "Accept": "application/json"
            }
        }).then(res => res.json())
        .then(states => {
            states.forEach(state => {
                let option = document.createElement('option');
                option.value = state.state_name;
                option.innerText = state.state_name;
                if(option.value === countryOpt.dataset.stateFromCountry){
                    option.setAttribute('selected', '');
                }
                statesSelect.appendChild(option);
                //quita el atributo disabled
                statesSelect.removeAttribute('disabled');
            });
            //console.log(countries)
        }); 
    } 

    countriesSelect.addEventListener('change', (e) => {
        //agrega el atributo disabled temporalmente en lo que la función asincrona hace su tarea
        statesSelect.setAttribute('disabled', '');
        
        //reiniciar las opciones
        statesSelect.innerHTML = "<option value='' disabled selected>Selecciona un opción</option>";
        let countryEndPoint = url + countriesSelect.value;
        fetch(countryEndPoint, {
            method: 'GET',
            headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJmcmFudmljdG9yMThAZ21haWwuY29tIiwiYXBpX3Rva2VuIjoieTFCSnNGYXk1Mm1sdE9uV2FiVmN6emxfOWVxOGpUdk9NaFhTVHhPVWdqdWpmakJ5M0JXbkRJcjNOZy1IbVp4N3BVVSJ9LCJleHAiOjE3MDgwOTQzODB9.RyL6bd7SamMjwH8ScjMK78RtGOIJu4cRCAAcWrUsUac",
                    "Accept": "application/json"
            }
        }).then(res => res.json())
        .then(states => {
            states.forEach(state => {
                let option = document.createElement('option');
                option.value = state.state_name;
                option.innerText = state.state_name;
                statesSelect.appendChild(option);
                //quita el atributo disabled
                statesSelect.removeAttribute('disabled');
            });
            //console.log(countries)
        }); 
    
    });

});







/* fetch(url, {
    method: 'GET',
    headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJmcmFudmljdG9yMThAZ21haWwuY29tIiwiYXBpX3Rva2VuIjoieTFCSnNGYXk1Mm1sdE9uV2FiVmN6emxfOWVxOGpUdk9NaFhTVHhPVWdqdWpmakJ5M0JXbkRJcjNOZy1IbVp4N3BVVSJ9LCJleHAiOjE3MDgwOTQzODB9.RyL6bd7SamMjwH8ScjMK78RtGOIJu4cRCAAcWrUsUac",
            "Accept": "application/json"
    }
}).then(res => res.json())
.then(countries => console.log(countries)); */







