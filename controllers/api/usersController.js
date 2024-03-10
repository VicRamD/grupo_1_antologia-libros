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

    detail: (req, res) => {
        const userId = req.params.id;

        db.User.findByPk(userId)
            .then(userDB => {
                if (!userDB) {
                    return res.status(404).json({
                        status: 404,
                        error: 'Usuario no encontrado',
                    });
                }

                const userData = {
                    id: userDB.id,
                    first_name: userDB.first_name,
                    last_name: userDB.last_name,
                    email: userDB.email,
                    pf_image_url: `/images/profileImages/${userDB.pf_image}`,
                };

                return res.json({
                    //status: 200,
                    user: userData,
                });

            }).catch(error => {
                console.log(error);
                // return res.status(500).json({
                //     status: 500,
                //     error: 'Error interno del servidor',
                // });
            });
    },
}

module.exports = controller;