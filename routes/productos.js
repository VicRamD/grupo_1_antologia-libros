const express = require('express');
const productosControllers = require('../controllers/productosControllers.js');
const router = express.Router();

router.get('/detail', productosControllers.productDetail);
router.get('/cart', productosControllers.productCart);

module.exports = router;
