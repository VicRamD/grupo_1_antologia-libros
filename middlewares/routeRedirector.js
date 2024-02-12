const finders = require('../utils/finders');
const fs = require('fs');
const path = require('path');
const users = JSON.parse(fs.readFileSync(path.join(process.cwd(), '/data/users.json')), 'utf-8');

function userRoute(req, res, next){
    if(req.session.currentUserMail){
        next();
    } else {
        return res.redirect('/users/login');
    }
}

async function privilegedUserRoute(req, res, next){
    if(req.session.currentUserMail){
        let user = await finders.searchUserByEmail(req.session.currentUserMail);
        if(user && user.category.name == "Administrador"){
            next();
        } else {
            return res.redirect('/users/profile');
            //return res.render('main/user_home', { user: user });
        }
    } else {
        return res.redirect('/users/login');
    }
}

module.exports = {userRoute, privilegedUserRoute}