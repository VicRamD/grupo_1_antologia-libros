const express = require('express');
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