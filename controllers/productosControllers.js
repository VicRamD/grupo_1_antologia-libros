const productosControllers = {
    detail: function (req,res) {
        res.render('products/productDetail')
    },
    cart: function (req,res) {
        res.render('products/productCart')
    },
    create: (req, res) => {
        res.render('products/productCreate', {operacion: 'create',});
    },
    edit: (req, res) => {
        res.render('products/productEdit');
    },
};

module.exports = productosControllers;