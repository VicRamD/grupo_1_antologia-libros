const express = require ('express');
const usersController = require ('../controllers/usersController.js')
const router = express.Router();

const multer = require('multer');
const path = require('path');
const {validateRegister, registerValidator} = require('../middlewares/registerValidation.js');
const {userRoute} = require('../middlewares/routeRedirector.js');

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

router.get('/login', usersController.login);
router.post('/user_home', usersController.user_home);
router.get('/profile', userRoute, usersController.profile);

router.get('/register', usersController.register);
//Multer debe ejecutarse primero o el body llega vacio
router.post('/register', uploadFile.single('avatar'), validateRegister, registerValidator, usersController.saveRegister);
router.get('/logout', usersController.logout);

module.exports = router;