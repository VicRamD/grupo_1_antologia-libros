const router = require ('express').Router();
const genresRoutes = require ('./genres.js');
const authorsRoutes = require ('./authors.js');
const usersRoutes = require ('./users.js')
const booksRoutes = require ('./books.js')

const apiController = require('../../controllers/api/apiController.js');

router.get('/', apiController.docs);
router.use('/genres', genresRoutes);
router.use('/authors', authorsRoutes);
router.use('/users', usersRoutes);
router.use('/books', booksRoutes);

module.exports = router;