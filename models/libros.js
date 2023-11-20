class Libro {
    constructor(id,title, abstract, author, editorial, image, genre, language, date, isbn, price){
        this.id = id;
        this.title = title;
        this.abstract = abstract;
        this.author = author;
        this.editorial = editorial;
        this.image = image;
        this.genre = genre;
        this.language = language;
        this.date = date;
        this.isbn = isbn;
        this.price = price;
    }
}

const libro1 = new Libro(1, 'Alas de Sangre', 'Libro de fantasía', 'Rebecca Yarros', 'Planeta', null, 'fantasia', 'español', null, 8247248782, 5800.50);
const libro2 = new Libro(2, '20000 Leguas de Viaje Submarino', 'Relata las aventuras de una tripulación dirigida por el Capitan Remo, capitan del Nautilus', 'Julio Berne', 'Planeta', null, 'Ciencia Ficción', 'español', null, 82483293892, 6000.00);

const libros = [libro1, libro2];
module.exports = libros;