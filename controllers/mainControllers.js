const fs = require('fs');
const path = require('path');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const finders = require('../utils/finders');
const { wasFileSend } = require('../utils/fileRelated');

const users = JSON.parse(fs.readFileSync(path.join(process.cwd(), '/data/users.json')), 'utf-8');

const db = require('../database/models');


//====== Controlador ===========/
let mainController = {
    index: async function (req, res) {
        if(req.session.currentUserMail){
            let user = await finders.searchUserByEmail(req.session.currentUserMail);
            return res.render('main/index', { user: user });
        }
        return res.render('main/index')
    },

}

module.exports = mainController;