const controller = {
    cart: (req, res) => {

    },
    list: (req, res) => {

    },
    create: (req, res) => {
        res.render('products/productCreate');
    },
    edit: (req, res) => {
        res.render('products/productEdit');
    },
}

module.exports = controller;