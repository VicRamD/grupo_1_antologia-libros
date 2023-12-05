const fs = require('fs');
const path = require('path');

const libros = JSON.parse( fs.readFileSync(path.join(process.cwd(), '/data/libros.json')),'utf-8');
const usuarios = JSON.parse(fs.readFileSync(path.join(process.cwd(), '/data/users.json')), 'utf-8');
const categorias = JSON.parse(fs.readFileSync(path.join(process.cwd(), '/data/categorias.json')), 'utf-8');


function buscarProductoPorId(id, productos){
    const productoBuscado = productos.find((producto) => producto.id === id);
    return productoBuscado;
}

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
        res.render('products/productEdit', {libro: libroEditar, categorias: categorias});
    },
    update: (req, res) => {
        //let idLibro = parseInt(req.params.id);
        //let libroVer = buscarProductoPorId(idLibro, libros);
        //res.render('products/productDetail', {libro: libroVer});
    },
};

module.exports = productosControllers;