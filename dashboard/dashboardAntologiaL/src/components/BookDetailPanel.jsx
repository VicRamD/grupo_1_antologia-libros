import { useState, useEffect } from 'react'
import './bookDetailStyles.css'

function BookDetailPanel() {


    let book= {
        "id": 20,
        "title": "Example",
        "abstract": "Example",
        "isbn": "",
        "date": "",
        "price": 0,
        "stock": 0,
        "image_url": "",
        "language": "Example",
        "genres": [
            {
                "id": 10,
                "name": "Example"
            }
        ],
        "authors": [
            {
                "id": 9,
                "name": "Example"
            }
        ],
        "editorial": {
            "id": 13,
            "name": "Example"
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
                image_url: book.image_url,
                language: book.language,
                authors: book.authors,
                genres: book.genres,
                editorial: book.editorial
            });            
            load = true;
        }).catch(err => console.log("Pasa por error"));
    },[]);

    

  return (
        <div className='row'>
            <h3 className='block'>Último libro agregado</h3>
            <div className='col-short border-column'>
                <img className='cover' src={'http://localhost:3030' +  bookDetail.image_url} alt='No hallado'/>
                <div className='div-info'>
                    <p className='id'><b>Id:</b> {bookDetail.id}</p>
                    <p className='big-screen'><b>ISBN:</b> {bookDetail.isbn}</p>
                    <p className='big-screen'><b>Precio:</b> {bookDetail.price}</p>
                    <p className='big-screen'><b>Stock:</b> {bookDetail.stock}</p>
                </div>
            </div>
            <div className='column detail'>
                
                <p><b>Titulo:</b> {bookDetail.title}</p>
                <p className='small-screen'><b>ISBN:</b> {bookDetail.isbn}</p>
                <p className='listTitle'><b>Autor/es:</b></p>
                
                <ul>
                    {bookDetail.authors.map(author => <li key={author.id + author.name}>{author.name}</li>)}
                </ul>
                
                <p><b>Sinopsis:</b> {bookDetail.abstract}</p>
                
                <p><b>Idioma:</b> {bookDetail.language}</p>
                <p><b>Editorial:</b> {bookDetail.editorial.name}</p> 
                <p className='listTitle'><b>Géneros:</b></p>
                <ul>
                    {bookDetail.genres.map(genre =><li key={genre.id + genre.name}>{genre.name}</li>)}
                </ul>
                <p className='small-screen'><b>Precio:</b> {bookDetail.price}</p>
                <p className='small-screen'><b>Stock:</b> {bookDetail.stock}</p> 
            </div>
        </div>
  )
}

export default BookDetailPanel