const libros = require('../models/libros');
const categorias = require('../models/categorias');

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
    edit: (req, res) => {
        let idLibro = parseInt(req.params.id);
        let libroEditar = buscarProductoPorId(idLibro, libros);
        res.render('products/productEdit', {libro: libroEditar, categorias: categorias});
    },
};

module.exports = productosControllers;