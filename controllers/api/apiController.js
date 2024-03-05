const finders = require('../../utils/finders');

const controller = {
    docs: async (req, res) => {
        let user = await finders.searchUserByEmail(req.session.currentUserMail);
        res.render('main/apiDoc', {user})
    }
}

module.exports = controller;