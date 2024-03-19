const express = require('express');
const router = express.Router();
//const {userRoute, privilegedUserRoute} = require('../middlewares/routeRedirector.js');

const cartControllers = require('../controllers/cartControllers');
router.get('/', cartControllers.cart);
router.get('/create', cartControllers.createCartItem)
module.exports = router;