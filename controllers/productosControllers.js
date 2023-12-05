const fs = require('fs');
const path = require('path');

const libros = JSON.parse( fs.readFileSync(path.join(process.cwd(), '/data/libros.json')),'utf-8');
const usuarios = JSON.parse(fs.readFileSync(path.join(process.cwd(), '/data/users.json')), 'utf-8');
const categorias = JSON.parse(fs.readFileSync(path.join(process.cwd(), '/data/categorias.json')), 'utf-8');


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
        console.log(libroBuscado);
        const indice = buscarIndiceProducto(id, libros);

        const {title, abstract, author, editorial, genre, language, date, isbn, price} = req.body;

        const wasSend = wasFileSend(req.file);
        //Elimina la imagen anterior para que no hay imagenes de más o duplicadas
        //fs.unlinkSync(path.join(process.cwd(), 'public/images/products/', libroBuscado.image));

		const image = wasSend ? req.file.filename : "";

        libroBuscado.title = title;
		libroBuscado.abstract = abstract;
		libroBuscado.author = author;
		libroBuscado.editorial = editorial;
		libroBuscado.genre = genre;
		libroBuscado.language = language;
        libroBuscado.date = date;
		libroBuscado.isbn = isbn;
        libroBuscado.price = price;
        libroBuscado.image = image;

        /*console.log(typeof price);
        console.log(JSON.stringify(genre));
        console.log(title)
        genre.forEach(g => {
            console.log(JSON.parse(g));
        }); */
        

		libros[indice] = libroBuscado;
		const convertidoAString = JSON.stringify(libros);

		fs.writeFileSync(path.join(__dirname, '../data/libros.json'), convertidoAString);

		res.redirect('/products/' + id);
    },
};

module.exports = productosControllers;