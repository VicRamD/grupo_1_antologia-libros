const router = require ('express').Router();
const authorsController = require ('../../controllers/api/authorsController');
//const {userRoute} = require('../middlewares/routeRedirector.js');
const {privilegedUserRoute} = require('../../middlewares/routeRedirector.js');


router.get('/', authorsController.list);
router.post('/', privilegedUserRoute, authorsController.create);
//router.put('/', authorsController.update);

module.exports = router;