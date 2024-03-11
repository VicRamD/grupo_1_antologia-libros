const router = require ('express').Router();
const authorsController = require ('../../controllers/api/authorsController');
//const {userRoute} = require('../middlewares/routeRedirector.js');

router.get('/', authorsController.list);
router.post('/', authorsController.create);
//router.put('/', authorsController.update);

module.exports = router;