window.addEventListener('load', ()=>{
    let formApi = document.getElementById('formAPI');
    let editorialInput = document.getElementById('editorialInput');
    let formError =  document.getElementById('formError');
    let btnForm =  document.getElementById('btnForm');
    let sectionGenres = document.querySelector('section.genres');

    console.log(formApi)

    editorialInput.addEventListener('input', ()=>{
        btnForm.setAttribute("disabled", true);
    });
    editorialInput.addEventListener('change', ()=>{
        if(editorialInput.value.length < 3){
            formError.innerText = `Debe por lo menos tener 3 letras`;
        } else {
            formError.innerText = '';
            fetch('/api/editorials')
            .then(res => res.json())
            .then(data => {
                let editorials = data.data;
                let editorialMatch = editorials.find(editorial => editorialInput.value.toLowerCase() == editorial.name.toLowerCase());
                if(editorialMatch){
                    formError.innerText = `La editorial ${editorialInput.value} ya se encuentra registrada`;
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
        fetch('/api/editorials', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({'name': editorialInput.value})
        }).then(res => res.json())
        .then(result => {
        
            console.log(result);
            fetch('/api/editorials')
            .then(res => res.json())
            .then(data => {
                let editorials = data.data;
                sectionGenres.innerHTML = `<form action="#" method="post" id="formAPI">
                <label for="editorialInput">Nuevo Género</label>
                <input type="text" name="name" id="editorialInput">
                <div id="formError"></div>
                <button type="submit" id="btnForm" disabled>Guardar</button>
            </form>`;
                editorials.forEach(editorial => {
                    sectionGenres.innerHTML += `<div class="box-genre">
                        <a href="/products/editorials?editorial=${editorial.name}">${editorial.name}</a>
                    </div> `          
                });
                
            }).catch(err => console.log(err))
        })
        .catch(error => console.log(error))
    })
})