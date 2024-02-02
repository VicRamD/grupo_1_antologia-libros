const fs = require('fs');
const path = require('path');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const finders = require('../utils/finders');
const { wasFileSend } = require('../utils/fileRelated');

const users = JSON.parse(fs.readFileSync(path.join(process.cwd(), '/data/users.json')), 'utf-8');

const db = require('../database/models');
const { log } = require('console');


//====== Controlador ===========/
let mainController = {
    index: async function (req, res) {
        if(req.session.currentUserMail){
            let user = await finders.searchUserByEmail(req.session.currentUserMail);
            return res.render('main/index', { user: user });
        }
        return res.render('main/index')
    },
    login: function (req, res) {
        res.render('users/login')
    },
    user_home: async function (req, res) {
        //let usuario = req.body;

        const { email, password, remember } = req.body;

        let login_user = users.find(user => user.email === email);

        const account = await db.User.findOne({
            where: {
                email
            }
        })

        //console.log(login_user);
        if (account){ //usuario encontrado
            
            let resultado="Acceso Denegado";

            // Comparar la contraseña ingresada con el hash almacenado
            const passwordsMatch = bcrypt.compareSync(password, account.password);

            if (passwordsMatch) {
                //console.log("Contraseña correcta. Acceso permitido.");
                req.session.currentUserMail = email;
                if(remember){
                    //maxage para tres días
                    res.cookie('rememberUser', email, { maxAge: 259200000 });
                }
                res.redirect('./profile');
            } else {
                //console.log("Usuario y/o contraseña incorrecta. Acceso denegado.");
                res.redirect('./login');
            }
        } else {//Usuario no encontrado
            
            console.log('Usuario y/o contraseña incorrecta. Acceso denegado.');
            res.redirect('./login');
        }
        
    },
    profile: async (req, res) => {
        let user = await finders.searchUserByEmail(req.session.currentUserMail);
        console.log(user);
        res.render('users/user_home', {user});
    },

    register: function (req, res) {
        res.render('users/register')
    },

    saveRegister: (req, res) => {
        //const {name, lastname, username, email, password, pwconfirm} = req.body;
        const {firstname, lastname, email, password} = req.body;

        //Busca id maximo y luego lo incrementa en 1
        let maxId = users.reduce((max, objeto) => (objeto.id > max ? objeto.id : max), 0);
        maxId++;

        let encryptPW = bcrypt.hashSync(password, saltRounds);

        const wasSend = wasFileSend(req.file);
        let image = wasSend ? req.file.filename : "";

        let newUser = {
            id: maxId,
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: encryptPW,
            category: 'Cliente',
            image: image,
        }

        users.push(newUser);
        const nuevoJsonString = JSON.stringify(users, null, 2);

        fs.writeFileSync(path.join(__dirname, '../data/users.json'), nuevoJsonString);

        res.render('main/index');
    },
    logout: (req, res) => {
        if(req.cookies && req.cookies.rememberUser){
            res.clearCookie('rememberUser');
            //console.log('en logout ' + req.cookies.rememberUser);
        }
        req.session.destroy();
        res.redirect('./login');
    }
}

module.exports = mainController;