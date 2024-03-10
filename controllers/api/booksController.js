const db = require('../../database/models');

const controller = {
    list: (req, res) => {

        db.Book.findAll({
            include: [
                { association: 'genres' }, 
                { association: 'editorial' }, 
                { association: 'authors' }
            ]
        }).then(books => {
            //const count = books.length;

            const countByGenre = {};
            books.forEach(book => {
                book.genres.forEach(genre => {
                    if (!countByGenre[genre.name]) {
                        countByGenre[genre.name] = 1;
                    } else {
                        countByGenre[genre.name]++;
                    }
                });
            });

            const booksData = books.map(book => ({
                id: book.id,
                name: book.title,
                description: book.abstract,
                genres: book.genres.map(genre => genre.name),
                author: book.authors.map(author => author.name),
                detail: `/api/books/${book.id}`
            }));

            return res.json({
                count: books.length,
                countByGenre: countByGenre,
                products: booksData
            });

        }).catch(error => {
            console.log(error);
            return res.status(500).json({
                error: 'Error Interno del Servidor'
            });
        });
    },

    detail: (req, res) => {
        const bookId = req.params.id;

        db.Book.findByPk(bookId, {
            include: [
                { association: 'genres' },
                { association: 'authors' },
                { association: 'editorial' }
            ]
        }).then(book => {
            if (!book) {
                return res.status(404).json({
                    error: 'Libro no encontrado'
                });
            }

            const bookData = {
                id: book.id,
                title: book.title,
                abstract: book.abstract,
                isbn: book.isbn,
                date: book.date,
                price: book.price,
                stock: book.stock,
                image_url: `/images/books/${book.image}`,
                language: book.language,
                genres: book.genres.map(genre => genre.name),
                authors: book.authors.map(author => ({
                    id: author.id,
                    name: author.name,
                })),
                editorial: {
                    id: book.editorial.id,
                    name: book.editorial.name,
                },
            };

            return res.json({
                book: bookData
            });

        }).catch(error => {
            console.log(error);
            return res.status(500).json({
                error: 'Internal Server Error'
            });
        });
    }
};

module.exports = controller;