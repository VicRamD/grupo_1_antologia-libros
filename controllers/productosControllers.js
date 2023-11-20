const libros = require('../models/libros');

const productosControllers = {
    detail: function (req,res) {
        res.render('products/productDetail');
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