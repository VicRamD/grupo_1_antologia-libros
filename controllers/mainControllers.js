const fs = require('fs');
const path = require('path');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const users = JSON.parse(fs.readFileSync(path.join(process.cwd(), '/data/users.json')), 'utf-8');

function wasFileSend(file){
	if(!file){
		return false;
	} else{
		return true;
    }
}

//====== Controlador ===========/
let mainController = {
    index: function (req, res) {
        res.render('main/index')
    },
    login: function (req, res) {
        res.render('main/login')
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