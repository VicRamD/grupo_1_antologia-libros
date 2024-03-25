const router = require ('express').Router();
const booksController = require ('../../controllers/api/booksController')

router.get('/', booksController.list);
router.get('/page', booksController.listPage);
router.get('/last', booksController.lastBookAdded);
router.get('/:id', booksController.detail);



module.exports = router;