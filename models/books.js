const categories = require('./categories');

class Book {
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

const book1 = new Book(
    1, 
    'Alas de Sangre', 
    'Libro de fantasía', 
    'Rebecca Yarros', 
    'Planeta', 
    '/images/books/alas_de_sangre.webp', 
    [categories[4]], 
    'español', 
    null, 
    8247248782, 
    5800.50);
    
const book2 = new Book(2, '20000 Leguas de Viaje Submarino', 'Relata las aventuras de una tripulación dirigida por el Capitan Remo, capitan del Nautilus', 'Julio Verne', 'Austral', '/images/books/veintemil_leguas_de_viaje.webp', [categories[0], categories[11]] , 'Español', null, 82483293892, 6000.00);
const book3 = new Book(3, 'La Vida es un Sueño', 'Un drama clásico sobre los límites de nuestra voluntad y las cadenas que nos atan y nos impiden ser libres. Una llamada a la reflexión: ¿es real cuanto vemos y vivimos?', 'Pedro Calderón de la Barca', 'Ediciones SM', '/images/books/la_vida_es_un_suenio.webp', [categories[11]], 'Español', null, 9788467591200, 6500);
const book4 = new Book(4, 'La Casa de Bernarda Alba', 'Una de las grandes obras del teatro español y universal que ofrece una dolorosa reflexión sobre la libertad, la necesidad de rebeldía y el peso de los límites y prejuicios ajenos.', 'Federico García Lorca', 'SANTILLANA LOQUELEO', '/images/books/la_casa_de_bernarda_alba.webp', [categories[10]], 'Castellano', null, 9788491221807, 11000);
const book5 = new Book(5, 'El Viento Conoce Mi Nombre', 'Una historia de violencia, amor, desarraigo y esperanza. En El viento conoce mi nombre pasado y presente se entrelazan para relatar el drama del desarraigo y la redención de la solidaridad, la compasión y el amor. Una novela actual sobre los sacrificios que a veces los padres deben hacer por sus hijos, sobre la sorprendente capacidad de algunos niños para sobrevivir a la violencia sin dejar de soñar, y sobre la tenacidad de la esperanza, que puede brillar incluso en los momentos más oscuros.', 'Isabel Allende', 'Plaza & Janes', '/images/books/el_viento_conoce_mi_nombre.webp', [categories[11]], 'Castellano', null, 9788401032004, 10000);
const book6 = new Book(6, 'Nosotros Dos en la Tormenta', 'Amistad, política y violencia en una Argentina feroz.', 'Eduardo Sacheri', 'ALFAGUARA', '/images/books/nosotros_dos_en_la_tormenta.webp', [categories[11]], 'Castellano', null, 9788420456560, 15000);
const book7 = new Book(7, 'El Amor es Imposible', 'Un ejercicio de pensamiento radical que nos anima a desandar lo andado en el camino del amor. ¿Qué significa que el único amor verdadero sea el amor imposible? ¿Es el amor lo que suponemos que es? ¿Y si fueran las preguntas lo que hay que cambiar porque es en la imposibilidad del encuentro amoroso donde radica su verdad?', 'Darío Sztajnszrajber', 'Paidós', '/images/books/amores_imposibles.webp', [categories[8]], 'Castellano', null, 9789501204070, 11000);
const book8 = new Book(8, 'La Última Encrucijada', 'En un año de elecciones presidenciales en el que se habla de un "fin de época", y en el que se cumplen cuarenta años de la recuperación de la democracia, se hace imperioso un análisis inteligente de las decisiones y de las acciones que han producido tantos vaivenes y que terminaron por bloquear el sistema político, provocar un estancamiento económico estructural y generar una profunda crisis social.', 'Jorge Liotti', 'Planeta', '/images/books/la_ultima_encrucijada.webp', [categories[13]], 'Castellano', null, 9789504977384, 12200);
const book9 = new Book(9, 'El Vuelo de la Libélula', 'Un secreto familiar llevará a Clara al fin del mundo, donde cree que se halla el principio de su historia.', 'Gabriela Exilart', 'Plaza & Janes', '/images/books/libelula.webp', [categories[11]], 'Castellano', null, 9789506446956, 10500);
const book10 = new Book(10, 'Flores en el Barro', 'Libro de autoayuda y superación personal.', 'Lorena Pronsky', 'Vergara', '/images/books/flores_barro.webp', [categories[14]], 'Castellano', null, 9789501532838, 9900);
const book11 = new Book(11, 'Adiós Cachorra', 'No estar en pareja está bien, separarse está bien, tener apps de citas está bien, salir y divertirse está bien. Lo que no está bien bajo ningún punto de vista es que sigamos permitiendo que la frustración que nos genera el ghosting, las cancelaciones de los encuentros a último momento, los chats abandonados, las promesas incumplidas por parte de gente que recién habíamos comenzado a conocer nos llenen de inseguridades, dudas y autoboicot.', 'Lucía Numer', 'Planeta', '/images/books/adios_cachorra.webp', [categories[1], categories[11]], 'Castellano', null, 9789504980865, 8400);
const book12 = new Book(12, 'Boquita', 'La historia del legendario equipo Boca Juniors vuelve a las librerías de la mano de Debate, en una edición revisada a cuatro manos por Juan y Martín Caparrós sobre el fenómeno deportivo capaz de unir a millones de personas en un sentimiento azul y amarillo.', 'Martín Caparrós - Juan Caparrós', 'Debate', "/images/books/boquita.webp", "Deporte, Ocio'", "Castellano", null, 9788418967795, 4300);
const book13 = new Book(13, 'Messiánico', 'Una biografía única y reveladora, con aspectos desconocidos e intimidades inesperadas del crack que completa con alegría y energía renovada su nueva etapa conquistando el único título que le faltaba: la Copa del Mundo, en Qatar 2022.', 'Alexandre Juillard - Sebastían Fest', 'Sudamericana', '/images/books/messianico.webp', [categories[7]], 'Castellano', null, 9789500768511, 12500);

const books = [book1, book2, book3, book4, book5, book6, book7, book8, book9, book10, book11, book12, book13];
module.exports = books;