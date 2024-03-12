const express = require('express');
const methodOverride =  require('method-override');
const { get } = require('http');
const path = require('path');
const mainRoutes = require('./routes/main.js')
const productRoutes = require ('./routes/products.js')
const apiRoutes = require ('./routes/api/api.js');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const rememberUser = require('./middlewares/rememberUser.js');
const {privilegedUserRoute} = require('./middlewares/routeRedirector.js');

const server = express();

//Permitiendo que el puerto en que se ejecuta React pueda acceder a la API
const cors = require("cors");
let corsOptions = {
  origin : ['http://localhost:5173'],
}
server.use(cors(corsOptions));

//============ Initialize Sequelize ===============
const { Sequelize } = require('sequelize');
const config = require('./database/config/config.js');

// Initialize Sequelize
const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
    host: config.development.host,
    dialect: config.development.dialect
  });
  
  // Test the database connection
  sequelize.authenticate()
    .then(() => {
      console.log(`
Se ha establecido conexión con BD exitosamente.
      `);
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });

//================================================/
const pathPublic = path.join(__dirname, '/public');
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(methodOverride('_method'));

server.use(session( {
    secret: "Ocol Ed Al Errot",
    resave: false,
    saveUninitialized: true,
}));

server.use(cookieParser());

//======= Template engine ===================
server.set('view engine', 'ejs')

server.use(express.static(pathPublic));

server.listen(3030, () => {
    console.log("Servidor corriendo en http://localhost:3030/");
});

server.use('/', rememberUser, mainRoutes)
server.use('/products', rememberUser, productRoutes)
//server.use('/api', rememberUser, privilegedUserRoute, apiRoutes);
server.use('/api', rememberUser, apiRoutes);

server.get('*', (req,res) => {
    res.render('error-404');
});
