const db = require('../../database/models');

const controller = {
    list: (req, res) => {
        db.User.findAll(
        {
            order: [['last_name','ASC'], ['first_name','ASC']],
            //include: ['id','last_name', 'first_name', 'email']
        },
        ).then(usersDB => {
            let usersData = [];
            usersDB.forEach(userDB => {
                let user = {
                    id: userDB.id,
                    name: userDB.last_name + " " + userDB.first_name,
                    email: userDB.email, 
                    detail: `/api/users/${userDB.id}`
                }
                usersData.push(user);
            });

            return res.json(
                {
                    count: usersDB.length,
                    status: 202,
                    users: usersData
                }
            )
        }).catch(error => {
            console.log(error);
        })
    },
}

module.exports = controller;