const productosControllers = {
    productDetail: function (req,res) {
        res.render('products/productDetail')
    },
    productCart: function (req,res) {
        res.render('products/productCart')
    },
    create: (req, res) => {
        res.render('products/productCreate', {operacion: 'create',});
    },
};

module.exports = productosControllers;