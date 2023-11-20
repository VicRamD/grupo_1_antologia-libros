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
    
}

module.exports = mainController;