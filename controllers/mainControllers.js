const fs = require('fs');
const path = require('path');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const { wasFileSend } = require('../utils/fileRelated');

const users = JSON.parse(fs.readFileSync(path.join(process.cwd(), '/data/users.json')), 'utf-8');


//====== Controlador ===========/
let mainController = {
    index: function (req, res) {
        res.render('main/index')
    },
    login: function (req, res) {
        res.render('main/login')
    },
    user_home: function (req, res) {
        let usuario = req.body;

        const { email, password } = req.body;
        let login_user = users.find(user => user.email === email);
        console.log(login_user);
        if (login_user){ //usuario encontrado
           
            let resultado="Acceso Denegado";

            // Comparar la contraseña ingresada con el hash almacenado
            const passwordsMatch = bcrypt.compareSync(password, login_user.password);

            if (passwordsMatch) {
                console.log("Contraseña correcta. Acceso permitido.");
                resultado=`Bienvenido ${login_user.firstname}`;
                req.session.currentUserMail = email;
                res.render('main/user_home', { email : email, password: password, resultado: resultado, user: login_user });
            } else {
                console.log("Usuario y/o contraseña incorrecta. Acceso denegado.");
                res.redirect('/login');
            }
        } else {//Usuario no encontrado
            
            console.log('Usuario y/o contraseña incorrecta. Acceso denegado.');
            res.redirect('/login');
        }
    },
    
    register: function (req, res) {
        res.render('main/register')
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
    }
    
}

module.exports = mainController;