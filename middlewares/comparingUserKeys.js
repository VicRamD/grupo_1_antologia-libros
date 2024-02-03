const db = require('../database/models');

function comparingKeys(req, res, next){
    let {id} = req.body;
    if(req.session && req.session.currentUserMail){
        db.User.findByPk(Number(id)).then(result => {
            if(result.email === req.session.currentUserMail){
                next()
            } else {
                res.redirect('./profile');
            }
        })
    }
}

module.exports = comparingKeys;