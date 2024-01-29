function rememberUser(req, res, next) {
    //console.log('en middle ' +req.cookies.rememberUser);
    if(req.cookies.rememberUser != undefined && req.session.currentUserMail == undefined){
        req.session.currentUserMail = req.cookies.rememberUser;
        //console.log('en middle ' +req.cookies.rememberUser);
    }

    next();
}

module.exports = rememberUser;