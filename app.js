const express = require('express');
const { get } = require('http');
const path = require('path');
const rutasMain = require('./routes/main.js')
const rutasProduct = require ('./routes/productos.js')

const server = express();

const pathPublic = path.join(__dirname, '/public');

server.set('view engine', 'ejs')

server.use(express.static(pathPublic));

server.listen(3030, () => {
    console.log("Servidor corriendo en http://localhost:3030/");
});

server.use('/', rutasMain)
server.use('/product', rutasProduct)

server.get('*', (req,res) => {
    res.send("-- ERROR, la ruta no es correcta --");
});

// server.get('/', (req, res) => {
//     const index = path.join(__dirname, 'views/index.html')
//     res.sendFile(index);
// });

// server.get('/register', (req,res) => {
//     const register = path.join(__dirname, '/views/register.html')
//     res.sendFile(register)
// })

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
