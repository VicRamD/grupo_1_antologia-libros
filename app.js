const express = require('express');
const methodOverride =  require('method-override');
const { get } = require('http');
const path = require('path');
const mainRoutes = require('./routes/main.js')
const productRoutes = require ('./routes/products.js')

const server = express();

//================================================/
const pathPublic = path.join(__dirname, '/public');
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(methodOverride('_method'));

//======= Template engine ===================
server.set('view engine', 'ejs')

server.use(express.static(pathPublic));

server.listen(3030, () => {
    console.log("Servidor corriendo en http://localhost:3030/");
});

server.use('/', mainRoutes)
server.use('/products', productRoutes)

server.get('*', (req,res) => {
    res.render('error-404');
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
