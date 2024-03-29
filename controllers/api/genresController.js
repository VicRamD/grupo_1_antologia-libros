const db = require('../../database/models');

const controller = {
    list: (req, res) => {
        db.Genre.findAll({
            order: [['name','ASC']]
        }).then(genres => {
            return res.json(
                {
                    count: genres.length,
                    status: 202,
                    data: genres
                }
            )
        }).catch(error => {
            console.log(error);
        })
    },
    create: (req, res) => {
        const {name} = req.body;
        db.Genre.create({
            name
        }).then(result => {
            return res.json(
                {
                    count: 1,
                    status: 202,
                    data: result
                }
            )
        }).catch(error => {
            console.log(error);
        })
    },
}

module.exports = controller;