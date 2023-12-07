const fs = require('fs');
const path = require('path');

const libros = JSON.parse( fs.readFileSync(path.join(process.cwd(), '/data/libros.json')),'utf-8');
const usuarios = JSON.parse(fs.readFileSync(path.join(process.cwd(), '/data/users.json')), 'utf-8');
const categorias = JSON.parse(fs.readFileSync(path.join(process.cwd(), '/data/categorias.json')), 'utf-8');

function buscarElementoPorId(id, lista){
    const elementoBuscado = lista.find((elemento) => elemento.id === id);
    return elementoBuscado;
}

function buscarProductoPorId(id, productos){
    const productoBuscado = productos.find((producto) => producto.id === id);
    return productoBuscado;
}

function buscarIndiceProducto(id, productos){
	const indice = productos.findIndex((producto) => producto.id === id);
	return indice;
}

function wasFileSend(file){
	if(!file){
		return false;
	} else{
		return true;
    }
}

//====== Controlador ===========/
const productosControllers = {
    list: (req,res) => {
        //res.send("Estás en la ruta de productos");
        res.render('products/productList', { libros: libros });
    }, 
    listBooks: (req,res) => {
        res.render('products/productList');
    },
    
    detail: (req,res) => {
        let idLibro = parseInt(req.params.id);
        let libroVer = buscarProductoPorId(idLibro, libros);
        res.render('products/productDetail', {libro: libroVer});
    },
    
    cart: function (req,res) {
        res.render('products/productCart');
    },
    create: (req, res) => {
        res.render('products/productCreate', {categorias: categorias});
    },

    //edición
    edit: (req, res) => {
        let idLibro = parseInt(req.params.id);
        let libroEditar = buscarProductoPorId(idLibro, libros);

        //Separa las categorias
        let categoriasDelLibro = libroEditar.genre;
        let indicesDecategorias = []

        /*guarda los indices de las categorias para enviarlos y usarlos para marcar 
        como seleccionadas las opciones en la vista por medio de etiqutas ejs */
        categoriasDelLibro.forEach(categoriaLibro => {
            let indiceDevuelto = categorias.findIndex((categoria) => categoriaLibro.id === categoria.id);
            if(indiceDevuelto !== -1){
                indicesDecategorias.push(indiceDevuelto);
            }
        });

        res.render('products/productEdit', {libro: libroEditar, categorias: categorias, indicesCategorias: indicesDecategorias});
    },
    update: (req, res) => {
        let {id} = req.params;
		id = Number(id);
		const libroBuscado = buscarProductoPorId(id, libros);
        const indice = buscarIndiceProducto(id, libros);

        const {title, abstract, author, editorial, genre, language, date, isbn, price} = req.body;

        const wasSend = wasFileSend(req.file);
        let image = "";
        if(libroBuscado.image !== ""){
            image = wasSend ? req.file.filename : libroBuscado.image;
        }else {
            image = wasSend ? req.file.filename : "";
        }
        
        //Elimina la imagen anterior para que no hay imagenes de más o duplicadas
        if(wasSend) {
            fs.unlink(path.join(process.cwd(), 'public/images/books/', libroBuscado.image), (err) => {
                if (err) {
                    throw err;
                }
                console.log("Archivo eliminado y reemplazado correctamente");
            });
        }
        
        libroBuscado.title = title;
		libroBuscado.abstract = abstract;
		libroBuscado.author = author;
		libroBuscado.editorial = editorial;
		//libroBuscado.genre = genre;
		libroBuscado.language = language;
        libroBuscado.date = date;
		libroBuscado.isbn = isbn;
        libroBuscado.price = price;
        libroBuscado.image = image;

        generosEscogidos = [];
        /* Antes de guardar las categorias en geenros escogidos pregunta si genre es un array
        pues si solo se escoge una opción llega como un string de un número ej: '10'*/
        //Number() transforma el string a numero que se pasa como parametro de la función
        if(Array.isArray(genre)){
            genre.forEach(genero => {
                generosEscogidos.push(buscarElementoPorId(Number(genero), categorias));
            });
        }else {
            generosEscogidos.push(buscarElementoPorId(Number(genre), categorias))
        }
        

        libroBuscado.genre = generosEscogidos;

		libros[indice] = libroBuscado;
		const convertidoAString = JSON.stringify(libros);

		fs.writeFileSync(path.join(__dirname, '../data/libros.json'), convertidoAString);

		res.redirect('/products/' + id);
    },

    delete: (req, res) => {
        const { id } = req.params;
        const i = buscarIndiceProducto(parseInt(id), libros);

        // Elimina la imagen del producto
        const producto = libros[i];
        if (producto && producto.image) {
            const imagePath = path.join(process.cwd(), 'public/images/books/', producto.image);
            fs.unlinkSync(imagePath);
        }

        // Elimina el producto
        libros.splice(i, 1);

        // Guarda la actualización en libros.json
        const convertidoAString = JSON.stringify(libros);
        fs.writeFileSync(path.join(process.cwd(), 'data/libros.json'), convertidoAString);

        res.redirect('/products');
    }
};

module.exports = productosControllers;