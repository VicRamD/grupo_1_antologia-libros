import { useState, useEffect } from 'react'
import './bookDetailStyles.css'

function BookDetailPanel() {


    let book= {
        "id": 20,
        "title": "Ejemplo",
        "abstract": "Diccionario imprescindible para el estudiante y para el hispanoparlante que comience a manejar el idioma inglés.",
        "isbn": "",
        "date": "",
        "price": 7360,
        "stock": 20,
        "image_url": "",
        "language": "Español",
        "genres": [
            "Autoayuda"
        ],
        "authors": [
            {
                "id": 9,
                "name": "Gabriela Exilart"
            }
        ],
        "editorial": {
            "id": 13,
            "name": "Ateneo"
        }
    }

    let load = false;

    const [bookDetail, setBookDetail] = useState(book);
    useEffect(()=>{
        fetch('http://localhost:3030/api/books/last')
        .then(res => res.json())
        .then(lastBook => {
            let book = lastBook.book
            setBookDetail({ 
                ...bookDetail, 
                id: book.id,
                title: book.title,
                abstract: book.abstract,
                isbn: book.isbn,
                price: book.price,
                stock: book.stock,
                image_url: book.image_url
            });            
            load = true;
        }).catch(err => console.log("Pasa por error"));
    },[]);

    

  return (
        <div className='row'>
            <h3 className='block'>Último libro agregado</h3>
            <div className='column border-column'>
                <img className='cover' src={'http://localhost:3030' +  bookDetail.image_url} alt='No hallado'/>
            </div>
            <div className='column'>
                <p><b>Id:</b> {bookDetail.id}</p>
                <p><b>Titulo:</b> {bookDetail.title}</p>
                <p><b>Sinopsis:</b> {bookDetail.abstract}</p>
                <p><b>ISBN:</b> {bookDetail.isbn}</p>
                <p><b>Precio:</b> {bookDetail.price}</p>
                <p><b>Stock:</b> {bookDetail.stock}</p>        
            </div>
        </div>
  )
}

export default BookDetailPanel