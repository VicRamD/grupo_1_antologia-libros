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

    createCartItem: async function(req, res){
        let user = await finders.searchUserByEmail(req.session.currentUserMail);
        let book_id = Number(req.query.book);
        let userSC;
        if(user){
            userSC= await db.Shopping_Cart.findOne({
                where: {
                    user_id: user.id
                },
                include: [{association: 'books'}]
            })
        }
        if(userSC){
            bookToAdd = await db.Book.findByPk(book_id);
            if(bookToAdd){
                //console.log(userSC.books);
                let alreadyIn = false;
                userSC.books.forEach(bk => {
                    if(Number(bk.id) === Number(bookToAdd.id)){
                        alreadyIn = true;
                    } 
                });

                if(!alreadyIn){
                    db.CartItem.create({
                        cart_id: userSC.id,
                        book_id: book_id,
                        quantity: 1
                    }).then(()=>{
                        res.redirect('./')
                    }).catch(err => console.log(err));
                } else {
                    return res.redirect('/products/cart');
                }
                
            } else{
                return res.redirect('/users/login');
            }
        } else {
            return res.redirect('/users/login');
        }
    }
};

module.exports = cartController;