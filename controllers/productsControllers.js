const { log, error } = require('console');
const fs = require('fs');
const path = require('path');
const { CLIENT_RENEG_WINDOW } = require('tls');
const finders = require('../utils/finders');
const { wasFileSend } = require('../utils/fileRelated');

//const genresController = require('./api/genresController');

const db = require('../database/models');
const {Op} = require('sequelize');

//const books = JSON.parse( fs.readFileSync(path.join(process.cwd(), '/data/books.json')),'utf-8');
//const users = JSON.parse(fs.readFileSync(path.join(process.cwd(), '/data/users.json')), 'utf-8');
//const categories = JSON.parse(fs.readFileSync(path.join(process.cwd(), '/data/categories.json')), 'utf-8');


//====== Controlador ===========/
const productsControllers = {
    list: async (req,res) => {

        db.Book.findAll({
            include: [{ 
                association: 'genres' 
            }, { 
                association: 'editorial' 
            }, {
                association: 'authors'
            }]
        })
        .then(books => {
            let user;
    
            if (req.session.currentUserMail) {
                return finders.searchUserByEmail(req.session.currentUserMail)
                    .then(foundUser => {
                        user = foundUser;
                        res.render('products/productList', { books, user });
                    });
            } else {
                res.render('products/productList', { books });
            }
        })
        .catch(error => {
            console.log(error);
            //res.status(500).send('Error al obtener la lista de libros');
        });

        /*//res.send("Estás en la ruta de productos");
        if(req.session.currentUserMail){
           let user = await finders.searchUserByEmail(req.session.currentUserMail);
           return res.render('products/productList', { books: books, user: user });
        }
        return res.render('products/productList', { books: books });*/
    },
    
    detail: async (req,res) => {
        let bookId = parseInt(req.params.id);
        let seeBook = await finders.searchProductById(bookId);
        console.log(seeBook);

        let reviews = await db.Review.findAll({
            where: {
                book_id: bookId
            }
        })
        console.log(reviews);

        if(req.session.currentUserMail){
            let user = await finders.searchUserByEmail(req.session.currentUserMail);
            return res.render('products/productDetail', { book: seeBook, reviews, user: user });
        }
        return res.render('products/productDetail', {book: seeBook, reviews});
    },
    

    create: async (req, res) => {
        const categories = await db.Genre.findAll({
            order: [['name', 'ASC']]
        });

        const editorials = await db.Editorial.findAll({
            order: [['name', 'ASC']]
        });

        const authors = await db.Author.findAll({
            order: [['name', 'ASC']]
        });

        let user = await finders.searchUserByEmail(req.session.currentUserMail);
        return res.render('products/productCreate', { categories, editorials, authors, user: user });

    },

    add: async (req,res) => {
        //console.log(req.body);
        const {title, abstract, author, editorial, genre, language, date, isbn, price, stock} = req.body;
        
        //let maxId = books.reduce((max, objeto) => (objeto.id > max ? objeto.id : max), 0);
        //maxId++;


        //Si se envió archivo de imagen guarda el nombre
        const wasSend = wasFileSend(req.file);
        let image = wasSend ? req.file.filename : "";

        /*let newBook = {
            id: maxId,
            title: title,
            abstract: abstract,
            author: author,
            editorial: editorial,
            image: image,
            genre: genren,
            language: language,
            date: date,
            isbn: isbn,
            price: price,
        } */

        db.Book.create({
            title,
            abstract,
           // author: author,
            editorial_id: Number(editorial),
            image: image,
            language,
            isbn,
            date,
            price,
            stock
        }).then(book => {
            /*Generos*/
            if(Array.isArray(genre)){
                genre.forEach(bookGenreId => {
                    db.BookGenre.create({
                        book_id: book.id,
                        genre_id: Number(bookGenreId)
                    }).then(bg => {})
                    .catch(error => {
                        console.log(error);
                    });
                    //chosenGenres.push(finders.searchGenreById(Number(bookGenreId)));
                });
            }else {
                db.BookGenre.create({
                    book_id: book.id,
                    genre_id: Number(genre)
                }).then(bg => {})
                .catch(error => {
                    console.log(error);
                });
            }

            if(Array.isArray(author)){
                author.forEach(authorId => {
                    db.BookAuthor.create({
                        book_id: book.id,
                        author_id: Number(authorId)
                    }).then(ba => {})
                    .catch(error => {
                        console.log(error);
                    });
                    //chosenGenres.push(finders.searchGenreById(Number(bookGenreId)));
                });
            }else {
                db.BookAuthor.create({
                    book_id: book.id,
                    author_id: Number(author)
                }).then(ba => {})
                .catch(error => {
                    console.log(error);
                });
            }
            return res.redirect('/products/add');
        })
        .catch(error => {
            console.log(error);
        })
         
        //console.log("nuevo "+ JSON.stringify(newBook, null, 2));
        //books.push(newBook);
        //const nuevoJsonString = JSON.stringify(books, null, 2);

        //fs.writeFileSync('nuevoLibro.json', nuevoJsonString);
        //fs.writeFileSync(path.join(__dirname, '../data/books.json'), nuevoJsonString);

        //console.log(req.file);
        //res.redirect('/products/add');
    },

    addAgain: async (req, res) => {
        if(req.session.currentUserMail){
            let user = await finders.searchUserByEmail(req.session.currentUserMail);
            return res.render('products/productAdded', {user: user });
        }
        return res.render('products/productAdded');
    },

    //edición
    edit: async (req, res) => {
        const bookId = parseInt(req.params.id);
        const editBook = await finders.searchProductById(bookId);
        const categories = await db.Genre.findAll({
            order: [['name', 'ASC']]
        });

        const editorials = await db.Editorial.findAll({
            order: [['name', 'ASC']]
        });

        const authors = await db.Author.findAll({
            order: [['name', 'ASC']]
        });

        //Separa las categorias
        let bookCategories = editBook.genres;
        let bookAuthors = editBook.authors;
        let genreIds = [];
        let authorIds = [];

        /*guarda los indices de las categorias para enviarlos y usarlos para marcar 
        como seleccionadas las opciones en la vista por medio de etiqutas ejs */
        bookCategories.forEach(bookCategory => {
            genreIds.push(Number(bookCategory.id));
            /*let returnedIndex = categories.findIndex((category) => bookCategory.id === category.id);
            if(returnedIndex !== -1){
                categoryIndexes.push(returnedIndex);
            }*/
        });

        bookAuthors.forEach(author => {
            authorIds.push(Number(author.id));
        })

            
            //return res.render('products/productEdit', { book: editBook, categories: categories,
                 //categoryIndexes: categoryIndexes, user: user });
        
        let user = await finders.searchUserByEmail(req.session.currentUserMail);
        console.log("book");
        console.log(editBook);
        return res.render('products/productEdit', {book: editBook, categories, editorials, authors, genreIds, authorIds, user });
        //return res.render('products/productEdit', {book: editBook, categories: categories, categoryIndexes: categoryIndexes});
    },

    update: async (req, res) => {
        let {id} = req.params;
		id = Number(id);
		//const searchedBook = finders.searchProductById(id, books);
        //const index = finders.searchProductIndex(id, books);
        const searchedBook= await db.Book.findByPk(id);
        //const searchedBook = JSON.parse(JSON.stringify(searchedBookById));

        const {title, abstract, author, editorial, genre, language, date, isbn, price, stock} = req.body;

        console.log(author);
        console.log("====================================");
        console.log("====================================");
        console.log("====================================");
        console.log(genre)
        console.log("======================0");
        console.log(isbn);

        const wasSend = wasFileSend(req.file);
        let image = "";
        if(searchedBook.image !== ""){
            image = wasSend ? req.file.filename : searchedBook.image;
        }else {
            image = wasSend ? req.file.filename : "";
        }
        
        //Elimina la imagen anterior para que no hay imagenes de más o duplicadas
        if(wasSend) {
            fs.unlink(path.join(process.cwd(), 'public/images/books/', searchedBook.image), (err) => {
                if (err) {
                    throw err;
                }
                console.log("Archivo eliminado y reemplazado correctamente");
            });
        }

        searchedBook.set({
            title,
            abstract,
            editorial_id: editorial,
            isbn,
            date,
            price,
            stock,
            image,
            language
        });

        await searchedBook.save();
        

        //generos en libro modificado
        db.BookGenre.destroy({
            where: {
                book_id: id
            }
        }).then(resultDel => {
                 /* Antes de guardar las categorias en generos escogidos pregunta si genre es un array
                pues si solo se escoge una opción llega como un string de un número ej: '10'*/
                //Number() transforma el string a numero 
                if(Array.isArray(genre)){
                    genre.forEach(bookGenre => {
                        db.BookGenre.create({
                            book_id: id,
                            genre_id: Number(bookGenre)
                        }).then(bg => {})
                        .catch(error => {
                            console.log(error);
                        });
                        //chosenGenres.push(finders.searchItemById(Number(bookGenre), categories));
                    });
                }else {
                    db.BookGenre.create({
                        book_id: id,
                        genre_id: Number(genre)
                    }).then(bg => {})
                    .catch(error => {
                        console.log(error);
                    });
                    //chosenGenres.push(finders.searchItemById(Number(genre), categories))
                }
            });
            
        //autores en libro modificado
        db.BookAuthor.destroy({
                where: {
                    book_id: id
                }
            }).then(resultDel => {
                 /* similar a lo que ocurre con genre */
                if(Array.isArray(author)){
                    author.forEach(bookAuthor => {
                        db.BookAuthor.create({
                            book_id: id,
                            author_id: Number(bookAuthor)
                        }).then(bg => {})
                        .catch(error => {
                            console.log(error);
                        });
                        //chosenGenres.push(finders.searchItemById(Number(bookGenre), categories));
                    });
                }else {
                    db.BookAuthor.create({
                        book_id: id,
                        author_id: Number(author)
                    }).then(ba => {})
                    .catch(error => {
                        console.log(error);
                    });
                    //chosenGenres.push(finders.searchItemById(Number(genre), categories))
                }
            });
           
            
            res.redirect('/products/' + id);    
        

        //console.log(genre);

        /*searchedBook.title = title;
		searchedBook.abstract = abstract;
		searchedBook.author = author;
		searchedBook.editorial = editorial;
		//libroBuscado.genre = genre;
		searchedBook.language = language;
        searchedBook.date = date;
		searchedBook.isbn = isbn;
        searchedBook.price = price;
        searchedBook.image = image; */

        /*chosenGenres = [];
        /* Antes de guardar las categorias en generos escogidos pregunta si genre es un array
        pues si solo se escoge una opción llega como un string de un número ej: '10'
        //Number() transforma el string a numero que se pasa como parametro de la función
        if(Array.isArray(genre)){
            genre.forEach(bookGenre => {
                chosenGenres.push(finders.searchItemById(Number(bookGenre), categories));
            });
        }else {
            chosenGenres.push(finders.searchItemById(Number(genre), categories))
        }
        
        searchedBook.genre = chosenGenres;

		books[index] = searchedBook;
		const convertedToString = JSON.stringify(books, null, 2);

		fs.writeFileSync(path.join(__dirname, '../data/books.json'), convertedToString);

		res.redirect('/products/' + id); */
    },

    delete: async (req, res) => {
        const { id } = req.params;
        //const i = finders.searchProductIndex(parseInt(id), books);

        //busca el libro a eliminar
        const bookToDelete = await db.Book.findOne({
            where: {
                id
            }
        });

        // Elimina la imagen del producto
        //const product = books[i];
        if (bookToDelete && bookToDelete.image) {
            const imagePath = path.join(process.cwd(), 'public/images/books/', bookToDelete.image);
            fs.unlinkSync(imagePath);
        }

        // Elimina el producto
        //books.splice(i, 1);
        db.Book.destroy({
            where: {
                id
            }
        }).then(result => {
            res.redirect('/products');
        })
        .catch(error => {
            console.log(error);
        })

        // Guarda la actualización en books.json
        //const convertedToString = JSON.stringify(books, null, 2);
        //const convertedToString = JSON.stringify(books);
        //fs.writeFileSync(path.join(process.cwd(), 'data/books.json'), convertedToString);

        //res.redirect('/products');
    },

    genres: async (req, res) => {

        let user;
        if(req.session.currentUserMail){
            user = await finders.searchUserByEmail(req.session.currentUserMail);
        }

        let generos = await db.Genre.findAll({
            order: [['name','ASC']]
        });

        let genres = JSON.parse(JSON.stringify(generos));

        if (req.query.genre) {
            let { genre } = req.query;
            
            //id = Number(genre);
            //let category = finders.searchItemByName(genre, categories);

            let categoryDb = await db.Genre.findOne({
                where: {
                    name: genre
                }
            })

            let category = JSON.parse(JSON.stringify(categoryDb));

            //let category = finders.searchItemByName(genre, categories);
            //let categoryBooks = [];
            /*books.forEach((book) => {
                book.genre.forEach((g) => {
                    if (g.id === category.id) {
                        categoryBooks.push(book);
                    }
                });
            }); */

            let categoryBooksDb = await db.BookGenre.findAll({
                where: {
                    genre_id: category.id
                },
                include: [{association: 'book', include: [{association: 'editorial'}, {association: 'authors'}]}]
            })

            let categoryBooks = JSON.parse(JSON.stringify(categoryBooksDb));
        
            // Verifica si no hay libros en la categoría
            if (categoryBooks.length === 0) {
                let noBooksMessage = 'No existen libros para esta categoría.<br>';
                let imageSrc = '/images/noEncontrado.png';
                /*if(req.session.currentUserMail){
                    let user = finders.searchUserByEmail(req.session.currentUserMail, users);
                    return res.render('products/booksByGenre', { noBooksMessage, imageSrc, categories, user });
                } */


                
                
                return res.render('products/booksByGenre', {
                    noBooksMessage: noBooksMessage,
                    imageSrc: imageSrc,
                    user
                });
            }
            console.log('------------');
                console.log(categoryBooks);
            
            /*if(req.session.currentUserMail){
                let user = finders.searchUserByEmail(req.session.currentUserMail, users);
                return res.render('products/booksByGenre', { categoryBooks, category, user });
            } */
            // Renderiza la vista con libros si existen
            return res.render('products/booksByGenre', { categoryBooks, category, user });

        } else {
            // Renderiza la vista con todas las categorías si no hay consulta de géneros
            return res.render('products/booksByGenre', { categories: genres, user });
        }
    },
    authors: async (req, res) => {
        let user;
        if(req.session.currentUserMail){
            user = await finders.searchUserByEmail(req.session.currentUserMail);
        }

        let autores = await db.Author.findAll({
            order: [['name','ASC']]
        });

        let authors = JSON.parse(JSON.stringify(autores));
        console.log("======================");
        console.log("======================");
        console.log("======================");
        console.log(authors);

        //return res.render('products/booksByAuthor', { authors, user });
        if (req.query.author) {
            let { author } = req.query;
        
            //id = Number(genre);
            //let category = finders.searchItemByName(genre, categories);

            let authorDb = await db.Author.findOne({
                where: {
                    name: author
                }
            })

            let searchedAuthor = JSON.parse(JSON.stringify(authorDb));

            let authorBooks = await db.BookAuthor.findAll({
                where: {
                    author_id: searchedAuthor.id
                },
                include: [{association: 'book', include: [{association: 'editorial'}, {association: 'genres'}]}]
            })

            let booksByAuthor = JSON.parse(JSON.stringify(authorBooks));
        
            // Verifica si no hay libros en la categoría
            if (booksByAuthor.length === 0) {
                let noBooksMessage = 'No existen libros para esta categoría.<br>';
                let imageSrc = '/images/noEncontrado.png';
                    
                return res.render('products/booksByGenre', {
                    noBooksMessage: noBooksMessage,
                    imageSrc: imageSrc,
                    user
                });
            }
            console.log('------------');
                console.log(booksByAuthor);
            // Renderiza la vista con libros si existen
            return res.render('products/booksByAuthor', { booksByAuthor, author: searchedAuthor, user });

        } else {
            // Renderiza la vista con todas las categorías si no hay consulta de géneros
            return res.render('products/booksByAuthor', { authors, user });
        } 
    },
    search: async (req, res) => {

        const {search} = req.query;


        let user;
        if(req.session.currentUserMail){
            user = await finders.searchUserByEmail(req.session.currentUserMail);
        }

        let searchResults = await db.Book.findAll({
            where: {
                title: {[Op.like]: `%${search}%`}
            },
            include: [{association: 'editorial'}, {association: 'authors'}],
            order: [['title', 'ASC']],
            limit: 20
        });

        console.log(JSON.parse(JSON.stringify(searchResults)));
        //console.log(searchResults)

        if(searchResults.length === 0){
            let noBooksMessage = 'No se encontraron resultados';
            let imageSrc = '/images/noEncontrado.png';
            return res.render('products/searchResults', {
                noBooksMessage: noBooksMessage,
                imageSrc: imageSrc,
                user
            });
        } else {
            return res.render('products/searchResults', {
                searchResults,
                user
            });
        }
    }
};

module.exports = productsControllers;