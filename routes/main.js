const express = require ('express');
const mainController = require ('../controllers/mainControllers.js')
const usersRoutes = require ('./users.js');
const router = express.Router();

const productsControllers = require('../controllers/productsControllers.js');
/*const multer = require('multer');
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
  
const uploadFile = multer({storage}); */

router.get('/', mainController.index);
router.get('/search', productsControllers.search);
router.use('/users', usersRoutes);
/* router.get('/login', mainController.login);
router.post('/user_home', mainController.user_home);
router.get('/profile', userRoute, mainController.profile);

router.get('/register', mainController.register);
//Multer debe ejecutarse primero o el body llega vacio
router.post('/register', uploadFile.single('avatar'), validateRegister, registerValidator, mainController.saveRegister);
router.get('/logout', mainController.logout);*/

module.exports = router;