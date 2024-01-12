const { log } = require('console');
const fs = require('fs');
const path = require('path');
const { CLIENT_RENEG_WINDOW } = require('tls');
const finders = require('../utils/finders');
const { wasFileSend } = require('../utils/fileRelated');

const books = JSON.parse( fs.readFileSync(path.join(process.cwd(), '/data/books.json')),'utf-8');
const users = JSON.parse(fs.readFileSync(path.join(process.cwd(), '/data/users.json')), 'utf-8');
const categories = JSON.parse(fs.readFileSync(path.join(process.cwd(), '/data/categories.json')), 'utf-8');

//====== Controlador ===========/
const productsControllers = {
    list: (req,res) => {
        //res.send("Estás en la ruta de productos");
        if(req.session.currentUserMail){
           let user = finders.searchUserByEmail(req.session.currentUserMail, users);
           return res.render('products/productList', { books: books, user: user });
        }
        return res.render('products/productList', { books: books });
    }, 
    listBooks: (req,res) => {
        res.render('products/productList');
    },
    
    detail: (req,res) => {
        let bookId = parseInt(req.params.id);
        let seeBook = finders.searchProductById(bookId, books);

        if(req.session.currentUserMail){
            let user = finders.searchUserByEmail(req.session.currentUserMail, users);
            return res.render('products/productDetail', { book: seeBook, user: user });
        }
        return res.render('products/productDetail', {book: seeBook});
    },
    
    cart: function (req,res) {
        if(req.session.currentUserMail){
            let user = finders.searchUserByEmail(req.session.currentUserMail, users);
            return res.render('products/productCart', { user: user });
        }
        return res.render('products/productCart');
    },
    

    create: (req, res) => {
        if(req.session.currentUserMail){
            let user = finders.searchUserByEmail(req.session.currentUserMail, users);
            return res.render('products/productCreate', { categories: categories, user: user });
         }
        res.render('products/productCreate', {categories: categories});
    },

    add: (req,res) => {
        console.log(req.body);
        const {title, abstract, author, editorial, genre, language, date, isbn, price} = req.body;
        
        let maxId = books.reduce((max, objeto) => (objeto.id > max ? objeto.id : max), 0);
        maxId++;

        /*Generos*/
        chosenGenres = [];
        if(Array.isArray(genre)){
            genre.forEach(bookGenre => {
                chosenGenres.push(finders.searchItemById(Number(bookGenre), categories));
            });
        }else {
            chosenGenres.push(finders.searchItemById(Number(genre), categories))
        }
        
        let genren = chosenGenres;

        console.log(genren)

        //Si se envió archivo de imagen guarda el nombre
        const wasSend = wasFileSend(req.file);
        let image = wasSend ? req.file.filename : "";

        let newBook = {
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
        }
         
        //console.log("nuevo "+ JSON.stringify(newBook, null, 2));
        books.push(newBook);
        const nuevoJsonString = JSON.stringify(books, null, 2);

        //fs.writeFileSync('nuevoLibro.json', nuevoJsonString);
        fs.writeFileSync(path.join(__dirname, '../data/books.json'), nuevoJsonString);

        //console.log(req.file);
        res.redirect('products/add');
    },
    addAgain: (req, res) => {
        if(req.session.currentUserMail){
            let user = finders.searchUserByEmail(req.session.currentUserMail, users);
            return res.render('products/productAdded', { books: books, user: user });
        }
        return res.render('products/productAdded');
    },

    //edición
    edit: (req, res) => {
        let bookId = parseInt(req.params.id);
        let editBook = finders.searchProductById(bookId, books);

        //Separa las categorias
        let bookCategories = editBook.genre;
        let categoryIndexes = []

        /*guarda los indices de las categorias para enviarlos y usarlos para marcar 
        como seleccionadas las opciones en la vista por medio de etiqutas ejs */
        bookCategories.forEach(bookCategory => {
            let returnedIndex = categories.findIndex((category) => bookCategory.id === category.id);
            if(returnedIndex !== -1){
                categoryIndexes.push(returnedIndex);
            }
        });

        if(req.session.currentUserMail){
            let user = finders.searchUserByEmail(req.session.currentUserMail, users);
            return res.render('products/productEdit', { book: editBook, categories: categories,
                 categoryIndexes: categoryIndexes, user: user });
        }
        return res.render('products/productEdit', {book: editBook, categories: categories, categoryIndexes: categoryIndexes});
    },

    update: (req, res) => {
        let {id} = req.params;
		id = Number(id);
		const searchedBook = finders.searchProductById(id, books);
        const index = finders.searchProductIndex(id, books);

        const {title, abstract, author, editorial, genre, language, date, isbn, price} = req.body;

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
        
        console.log(genre);

        searchedBook.title = title;
		searchedBook.abstract = abstract;
		searchedBook.author = author;
		searchedBook.editorial = editorial;
		//libroBuscado.genre = genre;
		searchedBook.language = language;
        searchedBook.date = date;
		searchedBook.isbn = isbn;
        searchedBook.price = price;
        searchedBook.image = image;

        chosenGenres = [];
        /* Antes de guardar las categorias en generos escogidos pregunta si genre es un array
        pues si solo se escoge una opción llega como un string de un número ej: '10'*/
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

		res.redirect('/products/' + id);
    },

    delete: (req, res) => {
        const { id } = req.params;
        const i = finders.searchProductIndex(parseInt(id), books);

        // Elimina la imagen del producto
        const product = books[i];
        if (product && product.image) {
            const imagePath = path.join(process.cwd(), 'public/images/books/', product.image);
            fs.unlinkSync(imagePath);
        }

        // Elimina el producto
        books.splice(i, 1);

        // Guarda la actualización en books.json
        //const convertedToString = JSON.stringify(books, null, 2);
        const convertedToString = JSON.stringify(books);
        fs.writeFileSync(path.join(process.cwd(), 'data/books.json'), convertedToString);

        res.redirect('/products');
    },

    genres: (req, res) => {
        if (req.query.genre) {
            let { genre } = req.query;
            
            //id = Number(genre);
            //let category = finders.searchItemByName(genre, categories);
            let category = finders.searchItemByName(genre, categories);
            let booksCategory = [];
            books.forEach((book) => {
                book.genre.forEach((g) => {
                    if (g.id === category.id) {
                        booksCategory.push(book);
                    }
                });
            });
    
            // Verifica si no hay libros en la categoría
            if (booksCategory.length === 0) {
                let noBooksMessage = 'No existen libros para esta categoría.<br>';
                let imageSrc = '/images/noEncontrado.png';

                if(req.session.currentUserMail){
                    let user = finders.searchUserByEmail(req.session.currentUserMail, users);
                    return res.render('products/booksByGenre', { noBooksMessage, imageSrc, categories, user });
                }
                
                return res.render('products/booksByGenre', {
                    noBooksMessage: noBooksMessage,
                    imageSrc: imageSrc,
                    categories,
                });
            }
    
            
            if(req.session.currentUserMail){
                let user = finders.searchUserByEmail(req.session.currentUserMail, users);
                return res.render('products/booksByGenre', { booksCategory, category, user });
            }
            // Renderiza la vista con libros si existen
            return res.render('products/booksByGenre', { booksCategory, category });
        } else {
            // Renderiza la vista con todas las categorías si no hay consulta de género
            if(req.session.currentUserMail){
                let user = finders.searchUserByEmail(req.session.currentUserMail, users);
                return res.render('products/booksByGenre', { categories, user });
            }
            return res.render('products/booksByGenre', { categories });
        }
    },
    
};

module.exports = productsControllers;