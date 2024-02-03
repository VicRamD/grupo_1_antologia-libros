const router = require ('express').Router();
const genresRoutes = require ('./genres.js')

//router.get('/', genresController.list);
router.use('/genres', genresRoutes);

module.exports = router;