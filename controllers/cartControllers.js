const finders = require('../utils/finders');

const db = require('../database/models');
const {Op} = require('sequelize');

const cartController = {
    cart: async function (req,res) {
        let user = await finders.searchUserByEmail(req.session.currentUserMail);
        let userSC;
        if(user){
            userSC= await db.Shopping_Cart.findOne({
                where: {
                    user_id: user.id
                },
                include: [{association: 'books'}]
            })
        }
        console.log(JSON.parse(JSON.stringify(userSC)));
        return res.render('products/productCart', {user, shoppingCart: userSC});
    },
};

module.exports = cartController;