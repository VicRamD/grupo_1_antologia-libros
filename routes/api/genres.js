const router = require ('express').Router();
const genresController = require ('../../controllers/api/genresController.js')
//const {userRoute} = require('../middlewares/routeRedirector.js');
const {privilegedUserRoute} = require('../../middlewares/routeRedirector.js');

router.get('/', genresController.list);
router.post('/', genresController.create);


module.exports = router;