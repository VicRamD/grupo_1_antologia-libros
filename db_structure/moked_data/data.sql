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

-- data de generos

LOCK TABLES `books` WRITE;
INSERT INTO `books` (id, title, abstract, `editorial_id`, image, isbn, date, price, stock, language) VALUES (1, 'Alas de Sangre', "Vuela... o muere. El nuevo fenómeno de fantasía juvenil del que todo el mundo habla.\r\n\r\n«¡La novela de fantasía más brutalmente adictiva que he leído en una década!» Tracy Wolff, autora de la Serie Crave",
1, "alas_de_sangre.webp", 8247248782, "", 5800.5, 30, "Español");
UNLOCK TABLES;

-- data de generos

LOCK TABLES `book_genre` WRITE;
INSERT INTO `book_genre` (id, `book_id`, `genre_id`) VALUES (1, 1, 8);
UNLOCK TABLES;

-- data de user_categories

LOCK TABLES `user_categories` WRITE;
INSERT INTO `user_categories` (id, `name`) VALUES (1, "Administrador"), (2, "Cliente");
UNLOCK TABLES;


-- data de users

LOCK TABLES `users` WRITE;
INSERT INTO `users` (id, `first_name`, `last_name`, `email`, `password`, `category_id`, `pf_image`) VALUES (1, "Victor", "Ramirez", "victorram@correo.ar", "$2b$10$204gD0l97fCwKSqGAV6d.uQGdWZIm73O/LvtuzZYejnDbvdWWzpp2", 1, "1705068823054_user_pfile_img.jpg"),
(2, "Juan", "Perez", "jp@correo.ar", "$2b$10$hIcOe0yKiB9T/Wj8lWDd1eOrg6yHzXMp6/VGk8O1tlC1iQE/wq4Z6", 2, "1703370673030_user_pfile_img.jpg"),
(3, "Carlos", "Zavaleta", "charlyzava256@gmail.com", "$2b$10$f3y0jHKh6A4xaLxHJJ9SKucTRlgZjRZu57I2uIXvHqY/ILrIsryp.", 1, "1705449309420_user_pfile_img.jpg");
UNLOCK TABLES;

-- data de addresses

LOCK TABLES `addresses` WRITE;
INSERT INTO `addresses` (id, `user_id`, `postal_code`) VALUES (1, 1, 4700);
UNLOCK TABLES;