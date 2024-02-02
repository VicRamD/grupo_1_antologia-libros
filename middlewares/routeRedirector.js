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

function privilegedUserRoute(req, res, next){
    if(req.session.currentUserMail){
        let user = finders.searchUserByEmail(req.session.currentUserMail, users);
        if(user && user.category == "Administrador"){
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