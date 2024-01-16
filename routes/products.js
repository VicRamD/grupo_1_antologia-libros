const express = require('express');
const multer = require('multer');
const path = require('path');

const productsControllers = require('../controllers/productsControllers.js');
const {validateBook, bookValidator} = require('../middlewares/bookValidation.js');
const {userRoute, privilegedUserRoute} = require('../middlewares/routeRedirector.js');

const router = express.Router();


// ************ Multer Storage ************
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(process.cwd(),'public/images/books'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_book_img_${path.extname(file.originalname)}`);
      //cb(null, `${Date.now()}_${file.originalname}`);
    }
});
  
const uploadFile = multer({storage});

router.get('/cart', productsControllers.cart);
router.get('/genres', productsControllers.genres);
router.get('/create', privilegedUserRoute, productsControllers.create);
router.get('/:id', productsControllers.detail);
router.get('/:id/edit', privilegedUserRoute, productsControllers.edit);
router.put('/:id', uploadFile.single('image'), productsControllers.update);
router.post('/add', uploadFile.single('image'), validateBook, bookValidator, productsControllers.add);
router.get('/add', privilegedUserRoute, productsControllers.addAgain),
router.delete('/:id', productsControllers.delete);
router.get('/', privilegedUserRoute, productsControllers.list);

//router.get('/list', productosControllers.list);//Para la lista
//router.get('/detail', productosControllers.detail);

module.exports = router;
