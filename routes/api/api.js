const router = require ('express').Router();
const genresRoutes = require ('./genres.js')
const authorsRoutes = require ('./authors.js')
const apiController = require('../../controllers/api/apiController.js')

router.get('/', apiController.docs);
router.use('/genres', genresRoutes);
router.use('/authors', authorsRoutes);

module.exports = router;