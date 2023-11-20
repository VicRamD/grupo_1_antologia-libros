const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/cart', productsController.cart);
router.get('/create', productsController.create);

module.exports = router;