const controller = {
    cart: (req, res) => {

    },
    list: (req, res) => {

    },
    create: (req, res) => {
        res.render('products/productCreate', {operacion: 'create',});
    },

}

module.exports = controller;