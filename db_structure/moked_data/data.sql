USE `antologia_libros`;

-- data de editoriales

LOCK TABLES `editorials` WRITE;
INSERT INTO `editorials` (id, name) VALUES (1, 'Planeta'), (2, 'Austral'), (3, 'Ediciones SM'), (4, 'SANTILLANA LOQUELEO'), 
(5, 'Plaza & Janes'), (6, 'ALFAGUARA'), (7, 'Paidós'), (8, 'Vergara'), (9, 'Debate'), (10, 'Sudamericana'), (11, 'GR. ILUSTRADOS'), 
(12, 'B DE BLOK'), (13, 'Ateneo'), (14, 'SCHOLASTIC'), (15, 'Albatros'), (16, 'SANTILLANA'), (17, 'HACHETTE');
UNLOCK TABLES;

-- data de generos

LOCK TABLES `genres` WRITE;
INSERT INTO `genres` (id, name) VALUES (1, 'Aventura'), (2, 'Humor'), (3, 'Ciencia Ficción'), (4, 'Ciencias Naturales'), 
(5, 'Ciencias Sociales'), (6, 'Drama'), (7, 'Para Niños'), (8, 'Fantasía'), (9, 'Historia'), (10, 'Arte'), (11, 'Filosofía'), 
(12, 'Cocina'), (13, 'Novela'), (14, 'Política'), (15, 'Autoayuda'), (16, 'Biografía'), (17, 'Deportes'), (18, 'Ocio');
UNLOCK TABLES;

-- data de libros

LOCK TABLES `books` WRITE;
INSERT INTO `books` (id, title, abstract, `editorial_id`, image, isbn, date, price, stock, language) VALUES (1, 'Alas de Sangre', "Vuela... o muere. El nuevo fenómeno de fantasía juvenil del que todo el mundo habla.\r\n\r\n«¡La novela de fantasía más brutalmente adictiva que he leído en una década!» Tracy Wolff, autora de la Serie Crave",
1, "alas_de_sangre.webp", "8247248782", "", 5800.5, 30, "Español"),
(2, '20000 Leguas de Viaje Submarino', "Relata las aventuras de una tripulación dirigida por el Capitan Nemo, capitan del asombroso Nautilus",
2, "1701911755821_book_img_.webp", "82483293892", "2018-12-14", 7000.00, 30, "Español"),
(3, 'La Vida es un Sueño', "Un drama clásico sobre los límites de nuestra voluntad y las cadenas que nos atan y nos impiden ser libres. Una llamada a la reflexión: ¿es real cuanto vemos y vivimos?",
3, "la_vida_es_un_suenio.webp", "9788467591200", "2000-10-11", 7000.00, 30, "Español"),
(4, 'La Casa de Bernarda Alba', "Una de las grandes obras del teatro español y universal que ofrece una dolorosa reflexión sobre la libertad, la necesidad de rebeldía y el peso de los límites y prejuicios ajenos.",
4, "la_casa_de_bernarda_alba.webp", "9788491221807", "2018-12-14", 7000.00, 30, "Castellano"),
(5, 'El Viento Conoce Mi Nombre', "Una historia de violencia, amor, desarraigo y esperanza. En El viento conoce mi name pasado y presente se entrelazan para relatar el drama del desarraigo y la redención de la solidaridad, la compasión y el amor. Una novela actual sobre los sacrificios que a veces los padres deben hacer por sus hijos, sobre la sorprendente capacidad de algunos niños para sobrevivir a la violencia sin dejar de soñar, y sobre la tenacidad de la esperanza, que puede brillar incluso en los momentos más oscuros.",
5, "el_viento_conoce_mi_nombre.webp", "9788401032004", "2023-02-20", 10000.00, 30, "Castellano"),
(6, 'Nosotros dos en la tormenta', "Amistad, política y violencia en una Argentina feroz.",
6, "nosotros_dos_en_la_tormenta.webp", "9788420456560", "", 15000.00, 30, "Castellano"),
(7, 'El Amor es Imposible', "Un ejercicio de pensamiento radical que nos anima a desandar lo andado en el camino del amor. ¿Qué significa que el único amor verdadero sea el amor imposible? ¿Es el amor lo que suponemos que es? ¿Y si fueran las preguntas lo que hay que cambiar porque es en la imposibilidad del encuentro amoroso donde radica su verdad?",
7, "amores_imposibles.webp", "9789501204070", "2012-12-10", 11000.00, 30, "Castellano"),
(8, 'La Última Encrucijada', "En un año de elecciones presidenciales en el que se habla de un \"fin de época\", y en el que se cumplen cuarenta años de la recuperación de la democracia, se hace imperioso un análisis inteligente de las decisiones y de las acciones que han producido tantos vaivenes y que terminaron por bloquear el sistema político, provocar un estancamiento económico estructural y generar una profunda crisis social.",
1, "la_ultima_encrucijada.webp", "9789504977384", "", 12200.00, 30, "Castellano"),
(9, 'El Vuelo de la Libélula', "Un secreto familiar llevará a Clara al fin del mundo, donde cree que se halla el principio de su historia.",
5, "libelula.webp", "9789506446956", "", 10500.00, 30, "Castellano"),
(10, 'Flores en el Barro', "Libro de autoayuda y superación personal.",
8, "flores_barro.webp", "9789501532838", "", 9900.00, 30, "Castellano"),
(11, 'Adiós Cachorra', "No estar en pareja está bien, separarse está bien, tener apps de citas está bien, salir y divertirse está bien. Lo que no está bien bajo ningún punto de vista es que sigamos permitiendo que la frustración que nos genera el ghosting, las cancelaciones de los encuentros a último momento, los chats abandonados, las promesas incumplidas por parte de gente que recién habíamos comenzado a conocer nos llenen de inseguridades, dudas y autoboicot.",
1, "adios_cachorra.webp", "9789504980865", "", 8400.00, 30, "Castellano"),
(12, 'Boquita', "La historia del legendario equipo Boca Juniors vuelve a las librerías de la mano de Debate, en una edición revisada a cuatro manos por Juan y Martín Caparrós sobre el fenómeno deportivo capaz de unir a millones de personas en un sentimiento azul y amarillo.",
9, "boquita.webp", "9788418967795", "", 4300.00, 30, "Castellano"),
(13, 'Messiánico', "Una biografía única y reveladora, con aspectos desconocidos e intimidades inesperadas del crack que completa con alegría y energía renovada su nueva etapa conquistando el único título que le faltaba: la Copa del Mundo, en Qatar 2022.",
10, "messianico.webp", "9789500768511", "", 12500.00, 30, "Castellano"),
(14, 'Mi Cocina Casera', "Con más de 100 recetas sencillas y sabrosas, Mi cocina casera es la herramienta perfecta para practicar, aprender e innovar en nuestro propio hogar, y hacer que cocinar se convierta en una experiencia inolvidable.",
11, "1702500453642_book_img_.jpg", "9786073135887", "2016-08-01", 29999.00, 30, "Castellano"),
(15, 'Fama y soledad de Picasso', "Un retrato íntimo y controvertido de Pablo Picasso, por John Berger, ganador del Premio Booker.",
6, "1702501143009_book_img_.jpg", "9789870427346", "2013-02-26", 12599.00, 30, "Castellano"),
(16, '¿Dónde está Wally ahora?', "Esta nueva entrega de ¿Dónde está Wally ahora? tiene solapas en cada página e incluye nuevas y mejores búsquedas que la edición anterior.\r\n\r\nUna edición de lujo para los coleccionistas o para quienes no han tenido suficiente con todo lo que había que buscar.",
12, "1702501482785_book_img_.webp", "9788415579717", "2020-12-01", 14799.00, 30, "Castellano"),
(17, 'Los Tres Mosqueteros', "Mi nombre es D'Artagnan y mi sueño siempre fue convertirme en un valiente mosquetero. Y adivina qué, ¡lo logré! Pero no fue nada fácil… ¿Te animas a ser parte de las grandes aventuras que emprendimos con mis amigos?\r\nUn cuento pensado para que los chicos conozcan la inolvidable historia detrás de la frase \"¡Uno para todos y todos para uno!\", acompañado por coloridas ilustraciones.",
13, "1703871165000_book_img_.webp", "9789500210164", "2019-10-11", 7000.00, 30, "Castellano"),
(18, 'El Eternauta', "El Eternauta es la primera novela gráfica en español y la más importante para el mundo hispanoamericano. Obra cumbre de la ciencia ficción, fue publicada originalmente en Argentina como una serie de 106 entregas desde 1957 a 1959, en la revista Hora Cero Semanal.\r\nPara esta edición definitiva, revisada y corregida, se han retocado más de cincuenta ilustraciones sin alterar el espíritu original de la obra, con la intención de optimizar su calidad visual, potencia y continuidad gráfica.\r\nCon su vitalidad narrativa, su vigor político y su peso iconográfico intactos, nos complace presentar la multipremiada historia que influenció a más de cinco generaciones de lectores alrededor de todo el mundo.",
1, "1705075625364_book_img_.webp", "9789504977117", "", 20000.00, 30, "Castellano"),
(19, 'Thea Stilton and the Fiesta in Mexico', "The Thea Sisters are going to Mexico City! They have been invited to be a part of a team researching monarch butterflies. Their friend Luz is an artist who is inspired by the butterflies and the culture of Mexico. When her mural goes missing just before her art show, the mouselets are on the case! Can they return the missing mural in time.",
14, "1705151958872_book_img_.webp", "9781338802221", "2018-06-06", 11359.40, 30, "Inglés"),
(20, 'Chacinados Criollos - cómo preparar los mejores Fiambres y Embutidos', "La elaboración casera de fiambres y embutidos como chorizos, morcillas o jamones es una práctica milenaria que sigue vigente. Las mejores técnicas para prepararlos y los principios esenciales de conservación forman parte de este libro. Además, recetas innovadoras e información para hacer de la fabricación de chacinados en casa un microemprendimiento exitoso.",
15, "1705419365236_book_img_.webp", "9789502416014", "2017-08-10", 13250.00, 30, "Castellano"),
(21, 'Clarita se volvió invisible', "Un día cualquiera, Clarita se vuelve invisible. Nadie la ve: ni su mamá, ni el gato, ni siquiera su hermanito. ¿Qué travesuras hará Clarita ahora que nadie la puede ver?",
16, "1705421427421_book_img_.webp", "9789504658498", "2019-06-10", 5400.00, 30, "Castellano"),
(22, 'Daughter of the Deep', "Mi nombre es D'Artagnan y mi sueño siempre fue convertirme en un valiente mosquetero. Y adivina qué, ¡lo logré! Pero no fue nada fácil… ¿Te animas a ser parte de las grandes aventuras que emprendimos con mis amigos?\r\nUn cuento pensado para que los chicos conozcan la inolvidable historia detrás de la frase \"¡Uno para todos y todos para uno!\", acompañado por coloridas ilustraciones.",
17, "1705449398638_book_img_.webp", "9781368077934", "2021-10-05", 14025.95, 30, "Inglés");

UNLOCK TABLES;

-- data de generos de libros

LOCK TABLES `book_genre` WRITE;
INSERT INTO `book_genre` (id, `book_id`, `genre_id`) VALUES 
(1, 1, 8),
(2, 2, 3), (3, 2, 1), 
(4, 3, 6), 
(5, 4, 13), 
(6,5,6), 
(7,6,6), 
(8,7,6), 
(9,8,14), 
(10,9,6), 
(11,10,15), 
(12,11,6), (13,11,1), (14,11,2), 
(15,12,17), (16,12,16), 
(17,13,17), (18,13,18), 
(19,14,12), 
(20,15,10), (21,15,16), 
(22,16,7), (23,16,18),
(24,17,7), (25,17,1), 
(26,18,3), (27,18,6), 
(28,19,7), 
(29,20,12), 
(30,21,7), 
(31,22,3), (32,22,7), (33,22,1);
UNLOCK TABLES;

-- data de autores
LOCK TABLES `authors` WRITE;
INSERT INTO `authors` (id, `name`) VALUES (1, "Rebecca Yarros"),
(2, "Julio Verne"), (3, "Pedro Calderón de la Barca"), (4, "Federico García Lorca"), (5, "Isabel Allende"),
(6, "Eduardo Sacheri"), (7, "Darío Sztajnszrajber"), (8, "Jorge Liotti"), (9, "Gabriela Exilart"), (10, "Lorena Pronsky"),
(11, "Lucía Numer"), (12, "Martín Caparrós"), (13, "Juan Caparrós"), (14, "Alexandre Juillard"), (15, "Sebastían Fest"),
(16, "Gordon Ramsay"), (17, "John Berger"), (18, "Martin Handford"), (19, "Alejandro Dumas"), (20, "H.G. Oesterheld"),
(21, "Elisabetta Dami"), (22, "Alberto Monín"), (23, "Graciela Montes"), (24, "Rick Riordan");
UNLOCK TABLES;

-- data de autores
LOCK TABLES `book_author` WRITE;
INSERT INTO `book_author` (`id`, `book_id`, `author_id`) VALUES 
(1, '1', '1'), 
(2, '2', '2'),
(3, '3', '3'), 
(4, '4', '4'), 
(5, '5', '5'), 
(6, '6', '6'), 
(7, '7', '7'), 
(8, '8', '8'), 
(9, '9', '9'), 
(10, '10', '10'), 
(11, '11', '11'), 
(12, '12', '12'), 
(13, '12', '13'), 
(14, '13', '14'), (15, '13', '15'), (16, '14', '16'), (17, '15', '17'), (18, '16', '18'), 
(19, '17', '19'), (20, '18', '20'), (21, '19', '21'), (22, '20', '22'), (23, '21', '23'), 
(24, '22', '24');
UNLOCK TABLES;

-- data de user_categories

LOCK TABLES `user_categories` WRITE;
INSERT INTO `user_categories` (id, `name`) VALUES (1, "Administrador"), (2, "Cliente");
UNLOCK TABLES;


-- data de users

LOCK TABLES `users` WRITE;
INSERT INTO `users` (id, `first_name`, `last_name`, `email`, `password`, `category_id`, `pf_image`) VALUES (1, "Victor", "Ramirez", "victorram@correo.ar", "$2b$10$204gD0l97fCwKSqGAV6d.uQGdWZIm73O/LvtuzZYejnDbvdWWzpp2", 1, "1705068823054_user_pfile_img.jpg"),
(2, "Juan", "Perez", "jp@correo.ar", "$2b$10$hIcOe0yKiB9T/Wj8lWDd1eOrg6yHzXMp6/VGk8O1tlC1iQE/wq4Z6", 2, "1703370673030_user_pfile_img.jpg"),
(3, "Carlos", "Zavaleta", "charlyzava256@gmail.com", "$2b$10$f3y0jHKh6A4xaLxHJJ9SKucTRlgZjRZu57I2uIXvHqY/ILrIsryp.", 1, "1705449309420_user_pfile_img.jpg"),
(4, "Daiana", "Lucero", "daylucero@gmail.com", "$2b$10$EM07gWyG06E6sBn4zMClguxXXTvn7GpLN8Xx/I0vH4BSgCYB6qf2m", 1, "1708317569967_user_pfile_img.jpg");
UNLOCK TABLES;

-- data de addresses

LOCK TABLES `addresses` WRITE;
INSERT INTO `addresses` (`id`, `user_id`, `street`, `city`, `state`, `postal_code`, `country`) VALUES 
(1, 1, NULL, NULL, NULL, 4700, NULL), 
(NULL, '4', NULL, 'Capital', 'Catamarca', 4700, 'Argentina');
UNLOCK TABLES;

-- data de pedidos 

LOCK TABLES `orders` WRITE;
INSERT INTO `orders` (`id`, `user_id`, `address_id`, `order_date`, `status`, `total_cost`) VALUES 
(NULL, '4', '2', '2024-02-01', 'Completada', '5400'), 
(NULL, '2', '2', '2024-01-09', 'Pendiente', '7000');;
UNLOCK TABLES;

-- data de pedidos de libros

LOCK TABLES `book_order` WRITE;
INSERT INTO `book_order` (`id`, `book_id`, `order_id`, `quantity`, `price_at_purchase`) VALUES 
(NULL, '21', '1', '1', '5400'),
(NULL, '2', '2', '1', '7000');
UNLOCK TABLES;

-- data de carrito de compras

LOCK TABLES `shopping_carts` WRITE;
INSERT INTO `shopping_carts` (`id`, `user_id`, `createdAt`) VALUES (NULL, '4', current_timestamp()), (NULL, '2', current_timestamp());
UNLOCK TABLES;

-- data de reviews

LOCK TABLES `reviews` WRITE;
INSERT INTO `reviews` (`id`, `book_id`, `user_id`, `comment`, `rating`) VALUES 
(NULL, '21', '4', 'Buen libro!', '4'), 
(NULL, '2', '2', 'Interesante y entretenido!', '4');
UNLOCK TABLES;

-- data de cart_items

LOCK TABLES `cart_items` WRITE;
INSERT INTO `cart_items` (`id`, `cart_id`, `book_id`, `quantity`) VALUES 
(NULL, '1', '21', '1'), 
(NULL, '2', '2', '1');