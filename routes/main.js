const express = require ('express');
const mainController = require ('../controllers/mainControllers.js')
const router = express.Router();

router.get('/', mainController.index);
router.get('/login', mainController.login);
router.get('/register', mainController.register)

module.exports = router;