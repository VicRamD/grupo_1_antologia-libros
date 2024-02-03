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
    check('firstname').notEmpty().withMessage("Debe completar el nombre"),
    check('lastname').notEmpty().withMessage("Debe completar el apellido"),
    check('email').isEmail()//.normalizeEmail()
    .withMessage("Debe ingresar un email valido").bail()
    .custom(async value => {
        let user = await finders.searchUserByEmail(value);
        if(user){
            throw new Error('El email ya se encuentra registrado');
        }
        return true;
    }).bail(),
    check('password').isLength({min:8}).withMessage("La contraseña deber contener por lo menos 8 carácteres").bail(),
    check('pwconfirm').custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas ingresadas no son iguales');
        }
        return true;
    }),
];

//===========================================================================
//===========================================================================

const registerValidator = (req, res, next) => {
    let errors = validationResult(req);

    //console.log(errors.mapped());

    if(errors.isEmpty()){
        next();
    } else {
        return res.render('users/register', {
            errors: errors.mapped(),
            old: req.body
        })
    }
};

//===========================================================================
//===========================================================================

let validateUpdatePD = [
    check('first_name').isLength({min: 2}).withMessage("Debe ingresar un nombre válido"),
    check('last_name').isLength({min: 2}).withMessage("Debe ingresar un apellido válido"),
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
    check('new_pw').isLength({min:8}).withMessage("La contraseña deber contener por lo menos 8 carácteres").bail(),
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
        })
    }
};

module.exports = {validateRegister, registerValidator,
     validateUpdatePD, updatePDValidator, 
     validateUpdatePW, updatePWValidator};