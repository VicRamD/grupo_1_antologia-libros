const express = require('express');
const productosControllers = require('../controllers/productosControllers.js');
const router = express.Router();

router.get('/cart', productosControllers.cart);
router.get('/create', productosControllers.create);
router.get('/:id', productosControllers.detail);
router.get('/:id/edit', productosControllers.edit);
router.get('/', productosControllers.list);
//router.get('/list', productosControllers.list);//Para la lista
//router.get('/detail', productosControllers.detail);

module.exports = router;
