const express = require('express');
const { get } = require('http');
const path = require('path');

const server = express();

const pathPublic = path.join(__dirname, '/public');

server.use(express.static(pathPublic));

server.listen(3030, () => {
    console.log("Servidor corriendo en http://localhost:3030/");
});

server.get('', (req, res) => {
    res.send('En construcción...');
});

server.get('/register', (req,res) => {
    const register = path.join(__dirname, '/views/register.html')
    res.sendFile(register)
})

server.get('/productCart', (req, res) => {
    const pathCart = path.join(__dirname, '/views/productCart.html');
    res.sendFile(pathCart);
}); 
