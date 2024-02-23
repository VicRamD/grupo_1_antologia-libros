const countriesAvailableService = [
    {
        value: 'Argentina', 
        name: 'Argentina',
        states: [
            {name: 'Buenos Aires'},
            {name: 'Catamarca'},
            {name: 'Chaco'},
            {name: 'Chubut'},
            {name: 'Cordoba'},
            {name: 'Corrientes'},
            {name: 'Distrito Federal'},
            {name: 'Entre Ríos'},
            {name: 'Formosa'},
            {name: 'Jujuy'},
            {name: 'La Pampa'},
            {name: 'La Rioja'},
            {name: 'Mendoza'},
            {name: 'Misiones'},
            {name: 'Neuquen'},
            {name: 'Rio Negro'},
            {name: 'Salta'},
            {name: 'San Juan'},
            {name: 'San Luis'},
            {name: 'Santa Cruz'},
            {name: 'Santa Fe'},
            {name: 'Santiago Del Estero'},
            {name: 'Tierra del Fuego'},
            {name: 'Tucuman'}
        ]
    },
    {
        value: 'Chile', 
        name: 'Chile',
        states: [
            {name: 'Aisen'},
            {name: 'Antofagasta'},
            {name: 'Araucania'},
            {name: 'Atacama'},
            {name: 'Bio Bio'},
            {name: 'Coquimbo'},
            {name: 'Ldor. Gral Bernardo'},
            {name: 'Los Lagos'},
            {name: 'Magallanes'},
            {name: 'Maule'},
            {name: 'Metropolitana'},
            {name: 'Met. de Santiago'},
            {name: 'Tarapaca'},
            {name: 'Valparaiso'},
        ]
    }, 
    {
        value: 'Colombia', 
        name: 'Colombia',
        states: [
            {name: 'Amazonas'},
            {name: 'Antioquia'},
            {name: 'Arauca'},
            {name: 'Atlantico'},
            {name: 'Bogota'},
            {name: 'Bolivar'},
            {name: 'Boyaca'},
            {name: 'Caldas'},
            {name: 'Caqueta'},
            {name: 'Casanare'},
            {name: 'Cauca'},
            {name: 'Cordoba'},
            {name: 'Guainia'},
            {name: 'Huila'},
            {name: 'La Guajira'},
            {name: 'Magdalena'},
            {name: 'Meta'},
            {name: 'Narino'},
            {name: 'Quindio'},
            {name: 'Risaralda'},
            {name: 'San Andres y Providencia'},
            {name: 'Santander'},
            {name: 'Tolima'},
            {name: 'Vichada'}
        ]
    },
    {
        value: 'Ecuador', 
        name: 'Ecuador',
        states: [
            {name: 'Azuay'},
            {name: 'Bolivar'},
            {name: 'Canar'},
            {name: 'El Oro'},
            {name: 'Galapagos'},
            {name: 'Imbabura'},
            {name: 'Los Rios'},
            {name: 'Manabi'},
            {name: 'Napo'},
            {name: 'Orellana'},
            {name: 'Pastaza'},
            {name: 'Sucumbios'},
            {name: 'Tungurahua'},
            {name: 'Zamora Chinchipe'},
        ]
    }, 
    {
        value: 'Spain', 
        name: 'España',
        states: [
            {name: 'A Coruna'},
            {name: 'Albacete'},
            {name: 'Asturias'},
            {name: 'Barcelona'},
            {name: 'Caceres'},
            {name: 'Cadiz'},
            {name: 'Cordoba'},
            {name: 'Granada'},
            {name: 'Guadalajara'},
            {name: 'Huesca'},
            {name: 'La Rioja'},
            {name: 'Madrid'},
            {name: 'Murcia'},
            {name: 'Navarra'},
            {name: 'Ourense'},
            {name: 'Palencia'},
            {name: 'Salamanca'},
            {name: 'Sevilla'},
            {name: 'Toledo'},
            {name: 'Valladolid'},
            {name: 'Zamora'}
        ]
    }, 
    {
        value: 'Paraguay', 
        name: 'Paraguay',
        states: [
            {name: 'Alto Paraguay'},
            {name: 'Alto Parana'},
            {name: 'Asturias'},
            {name: 'Boqueron'},
            {name: 'Caazapa'},
            {name: 'Concepcion'},
            {name: 'Guaira'},
            {name: 'Itapua'},
            {name: 'Misiones'},
            {name: 'Neembucu'},
            {name: 'Paraguari'},
            {name: 'Presidente Hayes'},
            {name: 'San Pedro'},
        ]
    },
    {
        value: 'Uruguay', 
        name: 'Uruguay',
        states: [
            {name: 'Artigas'},
            {name: 'Canelones'},
            {name: 'Cerro Largo'},
            {name: 'Colonia'},
            {name: 'Durazno'},
            {name: 'Flores'},
            {name: 'Florida'},
            {name: 'Lavalleja'},
            {name: 'Maldonado'},
            {name: 'Montevideo'},
            {name: 'Paysandu'},
            {name: 'Rio Negro'},
            {name: 'Rivera'},
            {name: 'Salto'},
            {name: 'San Jose'},
            {name: 'Tacuarembo'},
        ]
    }, 
    {
        value: 'Venezuela', 
        name: 'Venezuela',
        states: [
            {name: 'Anzoategui'},
            {name: 'Aragua'},
            {name: 'Bolivar'},
            {name: 'Cojedes'},
            {name: 'Delta Amacuro'},
            {name: 'Distrito Federal'},
            {name: 'Falcon'},
            {name: 'Guarico'},
            {name: 'Lara'},
            {name: 'Merida'},
            {name: 'Miranda'},
            {name: 'Portuguesa'},
            {name: 'Sucre'},
            {name: 'Trujillo'},
            {name: 'Vargas'},
            {name: 'Yaracuy'},
            {name: 'Zulia'}
        ]
    }
]

window.addEventListener('load', ()=> {

    //const url = "https://www.universal-tutorial.com/api/states/";

    const addressForm = document.getElementById('address');

    const countriesSelect = document.getElementById('country');
    const countryDefaultOpt = document.getElementById('opt-default-country');

    const statesSelect = document.getElementById('state');
    
    countriesAvailableService.forEach(country => {
        let option = document.createElement('option');
        option.value = country.value;
        option.innerText = country.name;
        if(option.value === countriesSelect.dataset.country){
            option.setAttribute('selected', '');
            countryDefaultOpt.removeAttribute('selected');
            if(statesSelect.dataset.state){
                option.setAttribute('data-state-from-country', statesSelect.dataset.state);
            }
        }
        countriesSelect.appendChild(option);
    });
    
    const stateDefaultOpt = document.getElementById('opt-default-state');

    //console.log(countriesSelect.value);
    if(countriesSelect.value){
        let countryOpt = document.querySelector(`option[value="${countriesSelect.value}"]`);
        console.log(countryOpt);

        statesSelect.innerHTML = "<option value='' disabled>Selecciona un opción</option>";

        let countrySelected;
        countriesAvailableService.forEach(country => {
            if(country.value === countryOpt.value){
                countrySelected = country;
            }
        });

        countrySelected.states.forEach(state => {
            let option = document.createElement('option');
            option.value = state.name;
            option.innerText = state.name;
            if(option.value === countryOpt.dataset.stateFromCountry){
                option.setAttribute('selected', '');
                stateDefaultOpt.removeAttribute('selected', '');
            }
            statesSelect.appendChild(option);
            //quita el atributo disabled
            statesSelect.removeAttribute('disabled');
        });

        /*let countryEndPoint = url + countriesSelect.value;
        fetch(countryEndPoint, {
            method: 'GET',
            headers: {
                    "Authorization": "Beare JhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJmcmFudmljdG9yMThAZ21haWwuY29tIiwiYXBpX3Rva2VuIjoieTFCSnNGYXk1Mm1sdE9uV2FiVmN6emxfOWVxOGpUdk9NaFhTVHhPVWdqdWpmakJ5M0JXbkRJcjNOZy1IbVp4N3BVVSJ9LCJleHAiOjE3MDgwOTQzODB9.RyL6bd7SamMjwH8ScjMK78RtGOIJu4cRCAAcWrUsUac",
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
        }); */
    } 

    countriesSelect.addEventListener('change', (e) => {
        //agrega el atributo disabled temporalmente en lo que la función asincrona hace su tarea
        statesSelect.setAttribute('disabled', '');
        
        //reiniciar las opciones
        statesSelect.innerHTML = "<option value='' disabled selected>Selecciona un opción</option>";

        let countrySelected;
        countriesAvailableService.forEach(country => {
            if(country.value === countriesSelect.value){
                countrySelected = country;
            }
        });

        countrySelected.states.forEach(state => {
            let option = document.createElement('option');
            option.value = state.name;
            option.innerText = state.name;
            statesSelect.appendChild(option);
            //quita el atributo disabled
            statesSelect.removeAttribute('disabled');
        });

        /*let countryEndPoint = url + countriesSelect.value;
        fetch(countryEndPoint, {
            method: 'GET',
            headers: {
                    "Authorization": "eare JhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJmcmFudmljdG9yMThAZ21haWwuY29tIiwiYXBpX3Rva2VuIjoieTFCSnNGYXk1Mm1sdE9uV2FiVmN6emxfOWVxOGpUdk9NaFhTVHhPVWdqdWpmakJ5M0JXbkRJcjNOZy1IbVp4N3BVVSJ9LCJleHAiOjE3MDgwOTQzODB9.RyL6bd7SamMjwH8ScjMK78RtGOIJu4cRCAAcWrUsUac",
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
        });  */
    
    });

});







/* fetch(url, {
    method: 'GET',
    headers: {
            "Authorization": "Berer JhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJmcmFudmljdG9yMThAZ21haWwuY29tIiwiYXBpX3Rva2VuIjoieTFCSnNGYXk1Mm1sdE9uV2FiVmN6emxfOWVxOGpUdk9NaFhTVHhPVWdqdWpmakJ5M0JXbkRJcjNOZy1IbVp4N3BVVSJ9LCJleHAiOjE3MDgwOTQzODB9.RyL6bd7SamMjwH8ScjMK78RtGOIJu4cRCAAcWrUsUac",
            "Accept": "application/json"
    }
}).then(res => res.json())
.then(countries => console.log(countries)); */







