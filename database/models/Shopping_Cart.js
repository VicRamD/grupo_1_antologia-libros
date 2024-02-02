module.exports = (sequelize, dataTypes) => {
    let alias = "Shopping_Cart";
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        user_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        }
    };
    
    let config = {
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: false,
        deletedAt: false,
        tableName: "shopping_carts",
        //timestamps: false
    }

    const Shopping_Cart = sequelize.define(alias, cols, config);

    Shopping_Cart.associate = (models) => {
        Shopping_Cart.belongsToMany(models.Book, { //A un carrito de compras pueden pertenecer uno o muchos libros
            as: "books", 
            through: 'cart_items', //Tabla intermedia 
            foreignKey: 'cart_id', //Clave foránea que apunta a shopping_carts
            otherKey: 'book_id', //Clave foránea que apunta a books
        });

        Shopping_Cart.belongsTo(models.User, { //Un carrito de compras pertenece a un solo cliente
            as: 'user',
            foreignKey: 'user_id'
        });

    };

    return Shopping_Cart;
}