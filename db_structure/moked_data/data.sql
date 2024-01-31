USE `antologia_libros`;

-- data de generos

LOCK TABLES `genres` WRITE;
INSERT INTO `genres` (id, name) VALUES (1, 'Aventura'), (2, 'Humor'), (3, 'Ciencia Ficción'), (4, 'Ciencias Naturales'), 
(5, 'Ciencias Sociales'), (6, 'Drama'), (7, 'Para Niños'), (8, 'Fantasía'), (9, 'Historia'), (10, 'Arte'), (11, 'Filosofía'), 
(12, 'Cocina'), (13, 'Novela'), (14, 'Política'), (15, 'Autoayuda'), (16, 'Biografía'), (17, 'Deportes'), (18, 'Ocio');
UNLOCK TABLES;