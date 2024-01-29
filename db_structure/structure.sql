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
  `price` FLOAT(20, 2) NOT NULL,
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
  `phone_number` INT(15),
  `user_id` INT(10) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

-- Estructura de Addresses

DROP TABLE IF EXISTS `addresses`;
CREATE TABLE `addresses` (
  `id` INT(10) NOT NULL AUTO_INCREMENT,
  `customer_id` INT(10) NOT NULL,
  `street` VARCHAR(70),
  `city` VARCHAR(50),
  `state` VARCHAR(50),
  `postal_code` INT(15),
  `country` VARCHAR(50),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`)
);

-- Estructura de Shopping Carts

DROP TABLE IF EXISTS `shopping_carts`;
CREATE TABLE `shopping_carts` (
  `id` INT(10) NOT NULL AUTO_INCREMENT,
  `customer_id` INT(10) NOT NULL,
  `createdAt` timestamp,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`)
);

-- Estructura de Cart Items

DROP TABLE IF EXISTS `cart_items`;
CREATE TABLE `cart_items` (
  `id` INT(10) NOT NULL AUTO_INCREMENT,
  `cart_id` INT(10) NOT NULL,
  `book_id` INT(10) NOT NULL,
  `quantity` INT(10),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`cart_id`) REFERENCES `shopping_carts` (`id`),
  FOREIGN KEY (`book_id`) REFERENCES `books` (`id`)
);

-- Estructura de orders (transacciones finalizadas)

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` INT(10) NOT NULL AUTO_INCREMENT,
  `customer_id` INT(10) NOT NULL,
  `address_id` INT(10) NOT NULL,
  `order_date` DATE NOT NULL,
  `status` VARCHAR(20) NOT NULL,
  `total_cost` FLOAT(20, 2) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`)
);

-- Estructura de books_orders

DROP TABLE IF EXISTS `books_orders`;
CREATE TABLE `books_orders` (
  `id` INT(10) NOT NULL AUTO_INCREMENT,
  `book_id` INT(10) NOT NULL,
  `order_id` INT(10) NOT NULL,
  `quantity` INT(10) NOT NULL,
  `price_at_purchase` FLOAT(20, 2) NOT NULL,
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
