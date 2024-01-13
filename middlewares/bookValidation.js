const { check, validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');
const finders = require('../utils/finders');

const users = JSON.parse(fs.readFileSync(path.join(process.cwd(), '/data/users.json')), 'utf-8');
const categories = JSON.parse(fs.readFileSync(path.join(process.cwd(), '/data/categories.json')), 'utf-8');

let validateBook = [
    check('title').notEmpty().withMessage("Debe completar el titulo de la obra"),
    check('author').notEmpty().withMessage("Debe completar el nombre del autor/a"),
    check('image').custom((value, {req}) => {
        let valid = false;
        if(req.file){
            if(req.file.mimetype === 'image/jpg' || req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png' 
            || req.file.mimetype === 'image/webp'){
                valid = true;    
            }
        }
        return valid;
    }).withMessage("Debe escoger una imagen para el libro"),
    //check('date').isDate().withMessage(""),
    check('language').notEmpty().withMessage('Debe ingresar el idioma del libro'),
    check('isbn').notEmpty().withMessage('Debe ingresar el ISBN (identificador internacional de publicaciones)'),
    check('price').notEmpty().withMessage('Debe ingresar el precio del libro').bail()
    .isNumeric().withMessage('La cantidad ingresada debe ser un número')
];

//===========================================================================
//===========================================================================

const bookValidator = (req, res, next) => {
    let genres = req.body.genre;
    let errors = validationResult(req);


    if(errors.isEmpty()){
        next();
    } else {
        /*if(req.session.currentUserMail){
            let user = finders.searchUserByEmail(req.session.currentUserMail, users);
            return res.render('products/productList', { books: books, user: user });
        }*/

        let categoryIndexes = []

        /*guarda los indices de las categorias para enviarlos y usarlos para marcar 
        como seleccionadas las opciones en la vista por medio de etiqutas ejs */
        console.log(genres);
        if(genres){
            console.log('En if');
            if(Array.isArray(genres)){
                genres.forEach(bookCategory => {
                    let returnedIndex = categories.findIndex((category) => Number(bookCategory) === category.id);
                    if(returnedIndex !== -1){
                        categoryIndexes.push(returnedIndex);
                    }
                });
            }else{
                let returnedIndex = categories.findIndex((category) => Number(genres) === category.id);
                categoryIndexes.push(returnedIndex);
            }
        }

        let user = finders.searchUserByEmail(req.session.currentUserMail, users);
        return res.render('products/productCreate', {
            categories,
            errors: errors.mapped(),
            old: req.body,
            categoryIndexes,
            user
        })
    }
};

module.exports = {validateBook, bookValidator};