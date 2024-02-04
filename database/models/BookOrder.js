module.exports = (sequelize, DataTypes) => {
    let alias = "BookOrder";
    let cols = {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        book_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
        order_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
        price_at_purchase: {
            type: DataTypes.FLOAT(20,2),
            allowNull: false,
        },
    };
    
    let config = {
        tableName: "book_order",
        timestamps: false
    }

    const BookOrder = sequelize.define(alias, cols, config);

    BookOrder.associate = (models) => {

        BookOrder.belongsTo(models.Book, {
            as: "book",
            foreignKey: 'book_id', //Clave foránea que apunta a books
        });

        BookOrder.belongsTo(models.Order, { 
            as: "order",
            foreignKey: 'order_id', //Clave foránea que apunta a orders
        });
        
    };

    return BookOrder;
}