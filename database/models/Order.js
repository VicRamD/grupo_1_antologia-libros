module.exports = (sequelize, dataTypes) => {
    let alias = "Order";
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
        },
        address_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        order_date: {
            type: dataTypes.DATE,
            allowNull: false
        },
        status: {
            type: dataTypes.STRING,
            allowNull: false
        },
        total_cost: {
            type: dataTypes.FLOAT(20,2),
            allowNull: false,
        }
    };
    
    let config = {
        tableName: "orders",
        timestamps: false
    }

    const Order = sequelize.define(alias, cols, config);

    Order.associate = (models) => {
        Order.belongsTo(models.User, { //Un pedido pertenece a un solo cliente
            as: "customer",
            foreignKey: 'user_id' }); 
        
        Order.belongsToMany(models.Book, { //Un pedido puede tener uno o muchos libros
            as: "books",
            through: 'books_orders', //Tabla intermedia
            foreignKey: 'order_id', //Clave foránea que apunta a orders
            otherKey: 'book_id', //Clave foránea que apunta a books
        });

        Order.belongsTo(models.Address, { //Un pedido pertenece a una dirección
            as: "addresses",
            foreignKey: 'address_id' 
        }); 
    };

    return Order;
}