const express = require('express');
const productosControllers = require('../controllers/productosControllers.js');
const router = express.Router();

router.get('/detail', productosControllers.productDetail);
router.get('/cart', productosControllers.productCart);
router.get('/create', productosControllers.create );

module.exports = router;
