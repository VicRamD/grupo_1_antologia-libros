const router = require ('express').Router();
const booksController = require ('../../controllers/api/booksController')

router.get('/', booksController.list);
router.get('/:id', booksController.detail);

module.exports = router;