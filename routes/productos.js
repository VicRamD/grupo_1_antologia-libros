const express = require('express');
const productosControllers = require('../controllers/productosControllers.js');
const router = express.Router();

router.get('/detail', productosControllers.detail);
router.get('/cart', productosControllers.cart);
router.get('/create', productosControllers.create);
router.get('/:id/edit', productosControllers.edit);

module.exports = router;
