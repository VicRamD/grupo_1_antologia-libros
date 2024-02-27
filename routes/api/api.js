const router = require ('express').Router();
const genresRoutes = require ('./genres.js')
const authorsRoutes = require ('./authors.js')

//router.get('/', genresController.list);
router.use('/genres', genresRoutes);
router.use('/authors', authorsRoutes);

module.exports = router;