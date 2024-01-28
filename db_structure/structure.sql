DROP DATABASE IF EXISTS `antologia_libros`;
CREATE DATABASE `antologia_libros`;
USE `antologia_libros`;

-- Estructura de editorials

DROP TABLE IF EXISTS `editorials`;
CREATE TABLE `editorials` (
  `id` INT(10) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`name`)
);

-- Estructura de Genres

DROP TABLE IF EXISTS `genres`;
CREATE TABLE `genres` (
  `id` INT(10) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`name`)
);

-- Estructura de Book

DROP TABLE IF EXISTS `books`;
CREATE TABLE `books` (
  `id` INT(10) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(95) NOT NULL,
  `abstract` TEXT(100),
  `editorial_id` INT(10),
  `isbn` INT(25) NOT NULL,
  `date` DATE,
  `price` FLOAT(15, 2) NOT NULL,
  `stock` INT(6) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`editorial_id`) REFERENCES `editorials` (`id`)
);

-- Estructura de Books_Genres

DROP TABLE IF EXISTS `books_genres`;
CREATE TABLE `books_genres` (
  `id` INT(10) NOT NULL AUTO_INCREMENT,
  `book_id` INT(10) NOT NULL,
  `genre_id` INT(10) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`)
);

-- Estructura de Authors

DROP TABLE IF EXISTS `authors`;
CREATE TABLE `authors` (
  `id` INT(10) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100),
  PRIMARY KEY (`id`)
);

-- Estructura de Books_Authors

DROP TABLE IF EXISTS `books_authors`;
CREATE TABLE `books_authors` (
  `id` INT(10) NOT NULL AUTO_INCREMENT,
  `book_id` INT(10) NOT NULL,
  `author_id` INT(10) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`)
);

-- Estructura de users

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` INT(10) NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(40) NOT NULL,
  `last_name` VARCHAR(40) NOT NULL,
  `email` VARCHAR(70) NOT NULL,
  `password` VARCHAR(70) NOT NULL,
  `category` VARCHAR(10) NOT NULL,
  `pf_image` INT(15),
  PRIMARY KEY (`id`),
  UNIQUE (`email`)
);

-- Estructura de Customers

DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers` (
  `id` INT(10) NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(40),
  `last_name` VARCHAR(40),
  `email` VARCHAR(70),
  `address` VARCHAR(70),
  `phone_number` INT(15),
  `user_id` INT(10) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

-- Estructura de orders

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` INT(10) NOT NULL AUTO_INCREMENT,
  `customer_id` INT(10) NOT NULL,
  `order_date` DATE NOT NULL,
  `status` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`)
);

-- Estructura de books_orders

DROP TABLE IF EXISTS `books_orders`;
CREATE TABLE `books_orders` (
  `id` INT(10) NOT NULL AUTO_INCREMENT,
  `book_id` INT(10) NOT NULL,
  `order_id` INT(10) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
);

-- Estructura de reviews

DROP TABLE IF EXISTS `reviews`;
CREATE TABLE `reviews` (
  `id` INT(10) NOT NULL AUTO_INCREMENT,
  `book_id` INT(10) NOT NULL,
  `customer_id` INT(10) NOT NULL,
  `comment` TEXT(800),
  `rating` FLOAT(5,1) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`)
);
