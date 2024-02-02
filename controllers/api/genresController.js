const db = require('../../database/models');

const controller = {
    list: (req, res) => {
        db.Genre.findAll({
            order: [['name','ASC']]
        }).then(genres => {
            return res.json(
                {
                    results: genres.length,
                    status: 202,
                    data: genres
                }
            )
        }).catch(error => {
            console.log(error);
        })
    }
}

module.exports = controller;