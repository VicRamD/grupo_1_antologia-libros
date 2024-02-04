const fs = require('fs');
const path = require('path');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const finders = require('../utils/finders');
const { wasFileSend } = require('../utils/fileRelated');

const users = JSON.parse(fs.readFileSync(path.join(process.cwd(), '/data/users.json')), 'utf-8');

const db = require('../database/models');

//====== Controlador ===========/
let controller = {
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
        //let user = await finders.searchUserByEmail(req.session.currentUserMail);
        let userSearched = await db.User.findOne({
            where: {
                email: req.session.currentUserMail
            },
            include: [{association: 'category'}, {association: 'address'}]
        })
        //console.log(user);
        const user = JSON.parse(JSON.stringify(userSearched));
        res.render('users/user_home', {user});
    },

    register: function (req, res) {
        res.render('users/register')
    },

    saveRegister: (req, res) => {
        //const {name, lastname, username, email, password, pwconfirm} = req.body;
        const {firstname, lastname, email, password} = req.body;
        

        //Busca id maximo y luego lo incrementa en 1
        //let maxId = users.reduce((max, objeto) => (objeto.id > max ? objeto.id : max), 0);
        //maxId++;

        let encryptPW = bcrypt.hashSync(password, saltRounds);

        const wasSend = wasFileSend(req.file);
        let image = wasSend ? req.file.filename : "";

        db.User.create({
            first_name: firstname,
            last_name: lastname,
            email,
            password: encryptPW,
            pf_image: image,
            category_id: 2
        }).then(user => {
            //res.render('main/index');
            db.Address.create({
                user_id: user.id
            }).then(address => {
                res.redirect('/');
            })
        })
    },
    updateUserPersonalData: (req, res) => {
        const {first_name, last_name, phone_number, id} = req.body;

        db.User.update({
            first_name, 
            last_name, 
            phone_number: Number(phone_number)
        },{
            where: {
                id: Number(id)
            }
        }).then(result => {
            res.redirect('./profile');
        })
    },
    updateUserPassword: (req, res) => {
        const {new_pw, id} = req.body;

        let encryptPW = bcrypt.hashSync(new_pw, saltRounds);

        db.User.update({
            password: encryptPW
        },{
            where: {
                id: Number(id)
            }
        }).then(result => {
            res.redirect('./profile');
        })
    },
    updateUserPfImage: async (req, res) => {
        const {id} = req.body;

        const user = await db.User.findByPk(Number(id));

        let searchedUser = JSON.parse(JSON.stringify(user));
        console.log(searchedUser)

        const wasSend = wasFileSend(req.file);
        let image = "";
        if(searchedUser.pf_image !== ""){
            image = wasSend ? req.file.filename : searchedUser.pf_image;
        }else {
            image = wasSend ? req.file.filename : "";
        }

        //Elimina la imagen anterior para que no hay imagenes de más o duplicadas
        if(wasSend) {
            fs.unlink(path.join(process.cwd(), 'public/images/profileImages/', searchedUser.pf_image), (err) => {
                if (err) {
                    throw err;
                }
                console.log("Archivo eliminado y reemplazado correctamente");
            });
        }

        console.log(image);
        db.User.update({
            pf_image: image
        },
        {
            where: {
                id: Number(id)
            }
        }).then(result => {
            res.redirect('./profile');
        })
    },
    updateAddress: async (req, res) => {
        const {id, country, state, postal_code, city, street} = req.body;

        db.Address.update(
            {
                country, 
                state, 
                postal_code, 
                city, 
                street
            },
            {
                where: {
                    id: Number(id)
                }
            }
        ).then(result => {
            res.redirect('./profile');
        });

       // let searchedAddress = JSON.parse(JSON.stringify(address));


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

module.exports = controller;