const categorias = require('./categorias');

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

const libro1 = new Libro(
    1, 
    'Alas de Sangre', 
    'Libro de fantasía', 
    'Rebecca Yarros', 
    'Planeta', 
    '/images/books/alas_de_sangre.webp', 
    [categorias[4]], 
    'español', 
    null, 
    8247248782, 
    5800.50);
    
const libro2 = new Libro(2, '20000 Leguas de Viaje Submarino', 'Relata las aventuras de una tripulación dirigida por el Capitan Remo, capitan del Nautilus', 'Julio Verne', 'Austral', '/images/books/veintemil_leguas_de_viaje.webp', [categorias[0], categorias[11]] , 'Español', null, 82483293892, 6000.00);
const libro3 = new Libro(3, 'La Vida es un Sueño', 'Un drama clásico sobre los límites de nuestra voluntad y las cadenas que nos atan y nos impiden ser libres. Una llamada a la reflexión: ¿es real cuanto vemos y vivimos?', 'Pedro Calderón de la Barca', 'Ediciones SM', '/images/books/la_vida_es_un_suenio.webp', [categorias[9]], 'Español', null, 9788467591200, 6500);
const libro4 = new Libro(4, 'La Casa de Bernarda Alba', 'Una de las grandes obras del teatro español y universal que ofrece una dolorosa reflexión sobre la libertad, la necesidad de rebeldía y el peso de los límites y prejuicios ajenos.', 'Federico García Lorca', 'SANTILLANA LOQUELEO', '/images/books/la_casa_de_bernarda_alba.webp', [categorias[9]], 'Castellano', null, 9788491221807, 11000);
const libro5 = new Libro(5, 'El Viento Conoce Mi Nombre', 'Una historia de violencia, amor, desarraigo y esperanza. En El viento conoce mi nombre pasado y presente se entrelazan para relatar el drama del desarraigo y la redención de la solidaridad, la compasión y el amor. Una novela actual sobre los sacrificios que a veces los padres deben hacer por sus hijos, sobre la sorprendente capacidad de algunos niños para sobrevivir a la violencia sin dejar de soñar, y sobre la tenacidad de la esperanza, que puede brillar incluso en los momentos más oscuros.', 'Isabel Allende', 'Plaza & Janes Editores', '/images/books/el_viento_conoce_mi_nombre.webp', [categorias[11]], 'Castellano', null, 9788401032004, 10000);
const libro6 = new Libro(6, 'Nosotros Dos en la Tormenta', 'Amistad, política y violencia en una Argentina feroz.', 'Eduardo Sacheri', 'ALFAGUARA', '/images/books/nosotros_dos_en_la_tormenta.webp', 'Novela', 'Castellano', null, 9788420456560, 15000);

const libros = [libro1, libro2, libro3, libro4, libro5, libro6];
module.exports = libros;