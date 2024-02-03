const router = require ('express').Router();
const genresController = require ('../../controllers/api/genresController.js')
//const {userRoute} = require('../middlewares/routeRedirector.js');

router.get('/', genresController.list);

module.exports = router;