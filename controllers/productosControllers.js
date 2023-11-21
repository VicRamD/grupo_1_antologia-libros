const libros = require('../models/libros');

const productosControllers = {

    list: (req,res) => {
        res.send("Estás en la ruta de productos");
    },
    
    detail: (req,res) => {

        let idLibro = parseInt(req.params.id);
        let libroVer;
        for(let libro of libros){
            if(libro.id === idLibro){
                libroVer = libro;
            }
        }
        res.render('products/productDetail', {libro: libroVer});
    },
    
    cart: function (req,res) {
        res.render('products/productCart');
    },
    create: (req, res) => {
        res.render('products/productCreate');
    },
    edit: (req, res) => {
        let idLibro = parseInt(req.params.id);
        let libroEditar;
        for(let libro of libros){
            if(libro.id === idLibro){
                libroEditar = libro;
            }
        }
        res.render('products/productEdit', {libro: libroEditar});
    },
};

module.exports = productosControllers;