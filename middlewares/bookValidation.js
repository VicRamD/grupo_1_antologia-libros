const { check, validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');
const finders = require('../utils/finders');

const db = require('../database/models');

//const users = JSON.parse(fs.readFileSync(path.join(process.cwd(), '/data/users.json')), 'utf-8');
//const categories = JSON.parse(fs.readFileSync(path.join(process.cwd(), '/data/categories.json')), 'utf-8');

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
    .isNumeric().withMessage('La cantidad ingresada debe ser un número'),
    check('stock').notEmpty().withMessage('Debe ingresar el stock del libro').bail()
    .isNumeric().withMessage('La cantidad ingresada debe ser un número')
];

//===========================================================================
//===========================================================================

const bookValidator = async (req, res, next) => {
    let genresChosen = req.body.genre;
    let authorsChosen = req.body.author;
    let errors = validationResult(req);

    console.log(errors.mapped())

    if(errors.isEmpty()){
        next();
    } else {
        /*if(req.session.currentUserMail){
            let user = finders.searchUserByEmail(req.session.currentUserMail, users);
            return res.render('products/productList', { books: books, user: user });
        }*/

        let genreIds = [];
        let authorIds = [];

        /*guarda los indices de las categorias para enviarlos y usarlos para marcar 
        como seleccionadas las opciones en la vista por medio de etiqutas ejs */
        //console.log(genresChosen);
        
        if(genresChosen){
            //console.log('En if');
            if(Array.isArray(genresChosen)){
                for(id of genresChosen){
                    genreIds.push(Number(id));
                }
            }else{
                genreIds.push(Number(genresChosen));
            }
        }
        //console.log(genreIds);

        if(authorsChosen){
            //console.log('En if');
            if(Array.isArray(authorsChosen)){
                for(id of authorsChosen){
                    authorIds.push(Number(id));
                }
            }else{
                authorIds.push(Number(authorsChosen));
            }
        }

        const categories = await db.Genre.findAll({
            order: [['name', 'ASC']]
        });

        const editorials = await db.Editorial.findAll({
            order: [['name', 'ASC']]
        });

        const authors = await db.Author.findAll({
            order: [['name', 'ASC']]
        });

        let user = await finders.searchUserByEmail(req.session.currentUserMail);
        return res.render('products/productCreate', {
            categories,
            editorials,
            authors,
            genreIds,
            authorIds,
            errors: errors.mapped(),
            old: req.body,
            //categoryIndexes,
            user
        })
    }
};

module.exports = {validateBook, bookValidator};