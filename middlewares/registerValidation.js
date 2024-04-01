const { check, validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');
const finders = require('../utils/finders');

//const users = JSON.parse(fs.readFileSync(path.join(process.cwd(), '/data/users.json')), 'utf-8');
const db = require('../database/models');

const bcrypt = require('bcrypt');
const saltRounds = 10;

/* function searchByEmail(email, list){
    const searchedRegister = list.find((reg) => reg.email === email);
    return searchedRegister;
} */
let validateRegister = [
    check('firstname').notEmpty().isLength({min: 2}).withMessage("El nombre debe tener 2 caracteres como minimo"),
    check('lastname').notEmpty().isLength({min: 2}).withMessage("El apellido debe tener 2 caracteres como minimo"),
    check('email').notEmpty().withMessage("El email es obligatorio").bail()
    .isEmail()//.normalizeEmail()
    .withMessage("Debe ingresar un email válido").bail()
    .custom(async value => {
        let user = await finders.searchUserByEmail(value);
        if(user){
            throw new Error('El email ya se encuentra registrado');
        }
        return true;
    }).bail(),
    check('password').notEmpty().withMessage("La contraseña debe contener por lo menos 8 carácteres, por lo menos una mayúscula, una minúscula, un número y un carácter especial")
    .isLength({min:8}).withMessage("La contraseña debe contener por lo menos 8 carácteres, por lo menos una mayúscula, una minúscula, un número y un carácter especial")
    .custom(value => {
        let errores = verifyPasswordExpresion(value);
        if(errores > 0){
            
            return false;
        }
        return true;
        
    })
    .withMessage("La contraseña debe contener por lo menos 8 carácteres, por lo menos una mayúscula, una minúscula, un número y un carácter especial")
    .bail(),
    check('pwconfirm').custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas ingresadas no son iguales');
        }
        return true;
    }),
    check('avatar')//.optional()
    .custom((value, {req}) => {
        console.log(req.file);
        let valid = false;

        //al ser opcional si no se recibe un archivo simplemente devuelve true, si lo recibe verifica emimetype
        if(req.file){
            if(req.file){
                if(req.file.mimetype === 'image/jpg' || req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png' 
                || req.file.mimetype === 'image/gif'){
                    valid = true;    
                }
            }
        } else {
            valid = true;
        }
        return valid;
    }).withMessage("Debe ingresar una imagen de los siguientes formatos (JPG, JPEG, PNG, GIF)")
];

//===========================================================================
//===========================================================================

const registerValidator = (req, res, next) => {
    let errors = validationResult(req);

    //console.log(errors.mapped());
    console.log(req.body);
    console.log(req.file);

    if(errors.isEmpty()){
        next();
    } else {
        return res.render('users/register', {
            errors: errors.mapped(),
            old: req.body,
            oldFile: req.file
        })
    }
};

//===========================================================================
//==========================================================================
let validateUpdatePFIm = [
    check('avatar')
    .custom((value, {req}) => {
        console.log(req.file);
        let valid = false;
        
        if(req.file){
            if(req.file.mimetype === 'image/jpg' || req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png' 
            || req.file.mimetype === 'image/gif'){
                valid = true;    
            }
        }
        
        return valid;
    }).withMessage("Debe ingresar una imagen de los siguientes formatos (JPG, JPEG, PNG, GIF)"),
    check('id').isNumeric().withMessage("Id invalido")
];

const updatePFimValidator = async (req, res, next) => {
    let errors = validationResult(req);
    //console.log(errors.array())
    if(errors.isEmpty()){
        next();
    } else {
        let user = await finders.searchUserByEmail(req.session.currentUserMail);
        return res.render('users/user_home', {
            user,
            errorPFIm: errors.array(),
            errorMessage: "Los datos ingresados contenían errores - no se guardaron los cambios"
        })
    }
};

//===========================================================================
//===========================================================================
let userChecked;
let validateLogin = [
    check('email').notEmpty().withMessage("El email es obligatorio").bail()
    .isEmail().bail()//.normalizeEmail()
    .withMessage("Debe ingresar un email válido").bail()
    .custom(async value => {
        userChecked = await finders.searchUserByEmail(value);

        if(!userChecked){
            throw new Error('El email o la contraseña son incorrectos');
        }
        return true;
    }).bail(),
    check('password').notEmpty().withMessage("La contraseña no debe quedar vacía").bail()
    .isLength({min:8}).withMessage("La contraseña debe contener por lo menos 8 carácteres")
    .bail()
    .custom(value => {
        let errores = verifyPasswordExpresion(value);
        if(errores > 0){
            
            return false;
        }
        return true;
        
    })
    .withMessage("La contraseña debe contener por lo menos 8 carácteres, por lo menos una mayúscula, una minúscula, un número y un carácter especial")
    .bail()
    .custom(value => {
        if(!userChecked){
            throw new Error('El email o la contraseña son incorrectos');
        } else {
            let passwordsMatch = bcrypt.compareSync(value, userChecked.password);
            
            if (passwordsMatch) {
                return true
            } else {
                throw new Error('El email o la contraseña son incorrectos');
            }
        }
    }),
];

const loginValidate = async (req,res,next) => {
    let errors = validationResult(req);
    /*console.log("----------------------------");
    console.log(errors.array());
    console.log("--------------------------------------");*/
    if (errors.isEmpty()){
        next();
    } else {
        return res.render('users/login', {

                errorsLg: errors.array(),


            //errorsLg: errors.array(),
            errorMessage: "Los datos contenían errores, intente de nuevo"
        })
       
    }

   } 
//===========================================================================
//===========================================================================

let validateUpdatePD = [
    check('first_name').isLength({min: 2}).withMessage("El nombre debe tener 2 caracteres como minimo"),
    check('last_name').isLength({min: 2}).withMessage("El apellido debe tener 2 caracteres como minimo"),
    check('id').isNumeric().withMessage("Id invalido"),
];

const updatePDValidator = async (req, res, next) => {
    let errors = validationResult(req);
    //console.log(errors.array())

    if(errors.isEmpty()){
        next();
    } else {
        let user = await finders.searchUserByEmail(req.session.currentUserMail);
        return res.render('users/user_home', {
            user,
            errorsPD: errors.array(),
            errorMessage: "Los datos ingresados contenían errores - no se guardaron los cambios"
        })
    }
};

let validateUpdatePW = [
    check('password').custom(async (value, {req}) => {
        let id = req.body.id;
        let user = await db.User.findByPk(Number(id));
        const passwordsMatch = bcrypt.compareSync(value, user.password);
        if(passwordsMatch){
            return true;
        } else{
            
            throw new Error('La contraseña ingresada en Contraseña Actual no es correcta');
        }
    }),
    check('new_pw').isLength({min:8}).withMessage("La contraseña debe contener por lo menos 8 carácteres, por lo menos una mayúscula, una minúscula, un número y un carácter especial").bail()
    .custom(value => {
        let errores = verifyPasswordExpresion(value);
        if(errores > 0){
            
            return false;
        }
        return true;
        
    })
    .withMessage("La contraseña deber contener por lo menos 8 carácteres, por lo menos una mayúscula, una minúscula, un número y un carácter especial").bail(),
    check('pwconfirm').custom((value, {req}) => {
        if (value !== req.body.new_pw) {
            throw new Error('Las contraseñas ingresadas no son iguales');
        }
        return true;
    }),
    check('id').isNumeric().withMessage("Id invalido"),
];

const updatePWValidator = async (req, res, next) => {
    let errors = validationResult(req);

    if(errors.isEmpty()){
        next();
    } else {
        let user = await finders.searchUserByEmail(req.session.currentUserMail);
        return res.render('users/user_home', {
            user,
            errorsPW: errors.array(),
            errorMessage: "Los datos ingresados contenían errores - no se guardaron los cambios"
        })
    }
};

//==================================================
//=================================================
function verifyPasswordExpresion(value){
    let errores = 0;
        //search devuelve -1 si no encuentra valores de la expresión regular
        if(value.trim().length < 8){
            errores++;
        } else if(value.search(/[a-z]/) < 0) {
            errores++;
        } else if(value.search(/[A-Z]/) < 0) {
            errores++;
        } else if(value.search(/[0-9]/) < 0) {
            console.log(value.search(/[0-9]/));
            errores++;
        } else if(value.search(/[A-Z]/) < 0) {
            errores++;
        } else if(value.search(/\W/) < 0) {
            //!@#\$%\^\&*\)\(+=._-
            //console.log(value.search(/\W/));
            errores++;
        }
    
    return errores;
}


module.exports = {validateRegister, registerValidator,
     validateUpdatePD, updatePDValidator, 
     validateUpdatePW, updatePWValidator,
     validateUpdatePFIm, updatePFimValidator,
     validateLogin, loginValidate
    };
