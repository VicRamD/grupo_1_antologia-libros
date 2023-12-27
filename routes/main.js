const express = require ('express');
const mainController = require ('../controllers/mainControllers.js')
const router = express.Router();

const multer = require('multer');
const path = require('path');
const {validateRegister, registerValidator} = require('../middlewares/registerValidation.js');

// ************ Multer Storage ************
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(process.cwd(),'public/images/profileImages'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_user_pfile_img${path.extname(file.originalname)}`);
    }
});
  
const uploadFile = multer({storage});


router.get('/', mainController.index);
router.get('/login', mainController.login);

router.get('/register', mainController.register);
//Multer debe ejecutarse primero o el body llega vacio
router.post('/register', uploadFile.single('avatar'), validateRegister, registerValidator, mainController.saveRegister);

module.exports = router;