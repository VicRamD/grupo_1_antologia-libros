const router = require ('express').Router();
const usersController = require ('../../controllers/api/usersController')

router.get('/', usersController.list);

module.exports = router;