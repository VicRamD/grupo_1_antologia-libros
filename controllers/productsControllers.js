const fs = require('fs');
const path = require('path');

const books = JSON.parse( fs.readFileSync(path.join(process.cwd(), '/data/books.json')),'utf-8');
const users = JSON.parse(fs.readFileSync(path.join(process.cwd(), '/data/users.json')), 'utf-8');
const categories = JSON.parse(fs.readFileSync(path.join(process.cwd(), '/data/categories.json')), 'utf-8');

function searchItemById(id, list){
    const searchedItem = list.find((item) => item.id === id);
    return searchedItem;
}

function searchProductById(id, products){
    const searchedProduct = products.find((product) => product.id === id);
    return searchedProduct;
}

function searchProductIndex(id, products){
	const index = products.findIndex((product) => product.id === id);
	return index;
}

function wasFileSend(file){
	if(!file){
		return false;
	} else{
		return true;
    }
}

//====== Controlador ===========/
const productsControllers = {
    list: (req,res) => {
        //res.send("Estás en la ruta de productos");
        res.render('products/productList', { books: books });
    }, 
    listBooks: (req,res) => {
        res.render('products/productList');
    },
    
    detail: (req,res) => {
        let bookId = parseInt(req.params.id);
        let seeBook = searchProductById(bookId, books);
        res.render('products/productDetail', {book: seeBook});
    },
    
    cart: function (req,res) {
        res.render('products/productCart');
    },
    create: (req, res) => {
        res.render('products/productCreate', {categories: categories});
    },

    //edición
    edit: (req, res) => {
        let bookId = parseInt(req.params.id);
        let editBook = searchProductById(bookId, books);

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

        res.render('products/productEdit', {book: editBook, categories: categories, categoryIndexes: categoryIndexes});
    },
    add: (req,res) => {
        console.log(req.body);
        const {title, abstract, author, editorial, genre, language, date, isbn, price} = req.body;
        
        

        const maxId = books.reduce((max, objeto) => (objeto.id > max ? objeto.id : max), 0);
        console.log(maxId);

        res.render('products/productAdded');
    },
    update: (req, res) => {
        let {id} = req.params;
		id = Number(id);
		const searchedBook = searchProductById(id, books);
        const index = searchProductIndex(id, books);

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
        /* Antes de guardar las categorias en geenros escogidos pregunta si genre es un array
        pues si solo se escoge una opción llega como un string de un número ej: '10'*/
        //Number() transforma el string a numero que se pasa como parametro de la función
        if(Array.isArray(genre)){
            genre.forEach(bookGenre => {
                chosenGenres.push(searchItemById(Number(bookGenre), categories));
            });
        }else {
            chosenGenres.push(searchItemById(Number(genre), categories))
        }
        
        searchedBook.genre = chosenGenres;

		books[index] = searchedBook;
		const convertedToString = JSON.stringify(books);

		fs.writeFileSync(path.join(__dirname, '../data/books.json'), convertedToString);

		res.redirect('/products/' + id);
    },

    delete: (req, res) => {
        const { id } = req.params;
        const i = searchProductIndex(parseInt(id), books);

        // Elimina la imagen del producto
        const product = books[i];
        if (product && product.image) {
            const imagePath = path.join(process.cwd(), 'public/images/books/', product.image);
            fs.unlinkSync(imagePath);
        }

        // Elimina el producto
        books.splice(i, 1);

        // Guarda la actualización en books.json
        const convertedToString = JSON.stringify(books);
        fs.writeFileSync(path.join(process.cwd(), 'data/books.json'), convertedToString);

        res.redirect('/products');
    },

    genres: (req, res) => {
        if (req.query.genre) {
            let { genre } = req.query;
            id = Number(genre);
            let category = searchItemById(id, categories);
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
                return res.render('products/booksByGenre', {
                    noBooksMessage: 'No existen libros para esta categoría.<br>',
                    imageSrc: '/images/noEncontrado.png',
                    categories,
                });
            }
    
            // Renderiza la vista con libros si existen
            return res.render('products/booksByGenre', { booksCategory, category });
        } else {
            // Renderiza la vista con todas las categorías si no hay consulta de género
            return res.render('products/booksByGenre', { categories });
        }
    },
    
};

module.exports = productsControllers;