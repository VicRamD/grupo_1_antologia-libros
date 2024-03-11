window.addEventListener('load', ()=>{
    let formApi = document.getElementById('formAPI');
    let authorInput = document.getElementById('authorInput');
    let formError =  document.getElementById('formError');
    let btnForm =  document.getElementById('btnForm');
    let sectionGenres = document.querySelector('section.genres');

    authorInput.addEventListener('input', ()=>{
        btnForm.setAttribute("disabled", true);
    });
    authorInput.addEventListener('change', ()=>{
        if(authorInput.value.length < 5){
            formError.innerText = `Debe por lo menos tener 5 letras`;
        } else {
            formError.innerText = '';
            fetch('/api/authors')
            .then(res => res.json())
            .then(data => {
                let authors = data.data;
                let genreMatch = authors.find(genre => authorInput.value.toLowerCase() == genre.name.toLowerCase());
                if(genreMatch){
                    formError.innerText = `El/la autor/a ${authorInput.value}, ya se encuentra registrado`;
                    btnForm.setAttribute("disabled", true);
                } else {
                    formError.innerText = '';
                    btnForm.removeAttribute("disabled");
                }
            }).catch(err => console.log(err))
        }
        
    })

    formApi.addEventListener('submit', (evt)=>{
        evt.preventDefault();
        fetch('/api/authors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({'name': authorInput.value})
        }).then(res => res.json())
        .then(result => {
            console.log(result);
            fetch('/api/authors')
            .then(res => res.json())
            .then(data => {
                let authors = data.data;
                sectionGenres.innerHTML = `<form action="#" method="post" id="formAPI">
                <label for="authorInput">Nuevo Género</label>
                <input type="text" name="name" id="authorInput">
                <div id="formError"></div>
                <button type="submit" id="btnForm" disabled>Guardar</button>
            </form>`;
                authors.forEach(author => {
                    sectionGenres.innerHTML += `<div class="box-genre">
                        <a href="/products/authors?author=${author.name}">${author.name}</a>
                    </div> `          
                });
                
            }).catch(err => console.log(err))
        })
        .catch(error => console.log(error))
    })
})