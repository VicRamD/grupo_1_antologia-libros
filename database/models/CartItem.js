module.exports = (sequelize, DataTypes) => {
    let alias = "CartItem";
    let cols = {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        cart_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
        book_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: true,
        },
    };
    
    let config = {
        tableName: "cart_items",
        timestamps: false
    }

    const CartItem = sequelize.define(alias, cols, config);

    CartItem.associate = (models) => {

        CartItem.belongsTo(models.Shopping_Cart, {
            as: "shopping_cart",
            foreignKey: 'cart_id', //Clave foránea que apunta a shopping_carts
        });

        CartItem.belongsTo(models.Book, { 
            as: "book",
            foreignKey: 'book_id', //Clave foránea que apunta a books
        });
        
    };

    return CartItem;
}