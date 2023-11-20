const express = require('express');
const { get } = require('http');
const path = require('path');
<<<<<<< HEAD
const rutasMain = require('./routes/main.js')
const rutasProduct = require ('./routes/productos.js')

=======
const productsRoutes = require('./routes/products');
>>>>>>> 4f9578d2314b984ec7e1aa95f4e52d7109befbfa

const server = express();

const pathPublic = path.join(__dirname, '/public');

server.set('view engine', 'ejs')

server.use(express.static(pathPublic));
server.set('view engine', 'ejs');

server.listen(3030, () => {
    console.log("Servidor corriendo en http://localhost:3030/");
});

server.use('/', rutasMain)
server.use('/product', rutasProduct)


// server.get('/', (req, res) => {
//     const index = path.join(__dirname, 'views/index.html')
//     res.sendFile(index);
// });

// server.get('/register', (req,res) => {
//     const register = path.join(__dirname, '/views/register.html')
//     res.sendFile(register)
// })

<<<<<<< HEAD
// server.get('/login', (req, res) => {
//     const pathLogin = path.join(__dirname, '/views/login.html');
//     res.sendFile(pathLogin);
// });

// server.get('/productDetail', (req,res) => {
//     const pathDetail = path.join(__dirname, '/views/productDetail.html')
//     res.sendFile(pathDetail)
// })

// server.get('/productCart', (req, res) => {
//     const pathCart = path.join(__dirname, '/views/productCart.html');
//     res.sendFile(pathCart);
// }); 
=======
server.get('/productCart', (req, res) => {
    const pathCart = path.join(__dirname, '/views/productCart.html');
    res.sendFile(pathCart);
}); 

// uso de router

server.use('/products', productsRoutes);
>>>>>>> 4f9578d2314b984ec7e1aa95f4e52d7109befbfa
