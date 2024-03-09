window.addEventListener('load', ()=>{
    let formApi = document.getElementById('formAPI');
    let genreInput = document.getElementById('genreInput');
    let formError =  document.getElementById('formError');
    let btnForm =  document.getElementById('btnForm');
    let sectionGenres = document.querySelector('section.genres');

    genreInput.addEventListener('input', ()=>{
        btnForm.setAttribute("disabled", true);
    });
    genreInput.addEventListener('change', ()=>{
        fetch('/api/genres')
        .then(res => res.json())
        .then(data => {
            let genres = data.data;
            let genreMatch = genres.find(genre => genreInput.value.toLowerCase() == genre.name.toLowerCase());
            if(genreMatch){
                formError.innerText = `El género ${genreInput.value} ya se encuentra registrado`;
                btnForm.setAttribute("disabled", true);
            } else {
                formError.innerText = '';
                btnForm.removeAttribute("disabled");
            }
        }).catch(err => console.log(err))
    })

    formApi.addEventListener('submit', (evt)=>{
        evt.preventDefault();
        fetch('/api/genres', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({'name': genreInput.value})
        }).then(res => res.json())
        .then(result => {
            console.log(result);
            fetch('/api/genres')
            .then(res => res.json())
            .then(data => {
                let genres = data.data;
                sectionGenres.innerHTML = `<form action="#" method="post" id="formAPI">
                <label for="genreInput">Nuevo Género</label>
                <input type="text" name="name" id="genreInput">
                <div id="formError"></div>
                <button type="submit" id="btnForm" disabled>Guardar</button>
            </form>`;
                genres.forEach(genre => {
                    sectionGenres.innerHTML += `<div class="box-genre">
                        <a href="/products/genres?genre=${genre.name}">${genre.name}</a>
                    </div> `          
                });
                
            }).catch(err => console.log(err))
        })
        .catch(error => console.log(error))
    })
})