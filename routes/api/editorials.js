const router = require ('express').Router();
const editorialsController = require ('../../controllers/api/editorialsController');
//const {privilegedUserRoute} = require('../../middlewares/routeRedirector.js');


router.get('/', editorialsController.list);
//router.post('/', privilegedUserRoute, editorialsController.create);
//router.put('/', authorsController.update);

module.exports = router;