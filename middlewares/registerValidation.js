const { check, validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');
const users = JSON.parse(fs.readFileSync(path.join(process.cwd(), '/data/users.json')), 'utf-8');

function searchByEmail(email, list){
    const searchedRegister = list.find((reg) => reg.email === email);
    return searchedRegister;
}

let validateRegister = [
    check('firstname').notEmpty().withMessage("Debe completar el nombre"),
    check('lastname').notEmpty().withMessage("Debe completar el apellido"),
    check('email').isEmail()//.normalizeEmail()
    .withMessage("Debe ingresar un email valido").bail()
    .custom(value => {
        let user = searchByEmail(value, users);
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
        return res.render('main/register', {
            errors: errors.mapped(),
            old: req.body
        })
    }
};

module.exports = {validateRegister, registerValidator};