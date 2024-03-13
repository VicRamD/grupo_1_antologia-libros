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

        let last8Books = await db.Book.findAll(
            {
                order: [['id', 'DESC']],
                limit: 8
            }
        )
        //console.log(last8Books)

        if(req.session.currentUserMail){
            let user = await finders.searchUserByEmail(req.session.currentUserMail);
            return res.render('main/index', { user, lastOnes: last8Books });
        }
        return res.render('main/index', {lastOnes: last8Books});
    },

}

module.exports = mainController;