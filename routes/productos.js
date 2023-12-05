const express = require('express');
const multer = require('multer');
const path = require('path');

const productosControllers = require('../controllers/productosControllers.js');
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

router.get('/cart', productosControllers.cart);
router.get('/create', productosControllers.create);
router.get('/:id', productosControllers.detail);
router.get('/:id/edit', productosControllers.edit);
router.put('/:id', uploadFile.single('image'), productosControllers.update);
router.get('/', productosControllers.list);
//router.get('/list', productosControllers.list);//Para la lista
//router.get('/detail', productosControllers.detail);

module.exports = router;
