const db = require('../../database/models');

const controller = {
    list: (req, res) => {
        db.Author.findAll({
            order: [['name','ASC']]
        }).then(authors => {
            return res.json(
                {
                    results: authors.length,
                    status: 202,
                    data: authors
                }
            )
        }).catch(error => {
            console.log(error);
        })
    },
    create: (req, res) => {
        const {name} = req.body;
        db.Author.create({
            name
        }).then(result => {
            return res.json(
                {
                    results: 1,
                    status: 202,
                    data: result
                }
            )
        }).catch(error => {
            console.log(error);
        })
    },
    update: (req, res) => {
        const {id} = req.params;
        const {name} = req.body;
        db.Author.update(
        {
            name
        },
        {
            where: {
                id
            }
        }).then(result => {
            return res.json(
                {
                    results: 1,
                    status: 202,
                    data: result
                }
            )
        }).catch(error => {
            console.log(error);
        })
    }
}

module.exports = controller;