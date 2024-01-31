module.exports = (sequelize, dataTypes) => {
    let alias = "Customer";
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        first_name: {
            type: dataTypes.STRING
        },
        last_name: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        phone_number: {
            type: dataTypes.INTEGER(15),
        },
        user_id: {
            type: dataTypes.INTEGER(10),
            allowNull: false
        }
    };
    
    let config = {
        tableName: "customers",
        timestamps: false
    }

    const Customer = sequelize.define(alias, cols, config);

    Customer.associate = (models) => { //Un cliente puede realizar uno o varios pedidos
        Customer.hasMany(models.Order, { 
            as: "orders",
            foreignKey: 'customer_id' 
        }); 
        
        /*Customer.hasMany(models.Review, { //Un cliente puede dejar una o varias reseñas
            as: "reviews",
            foreignKey: 'customer_id' 
        }); */

        //siguiendo la logica de que la foreignKey se define aqui uso has one
        Customer.belongsTo(models.User, { //Un cliente pertenece a un solo usuario
            as: "users",
            foreignKey: 'user_id' 
        }); 

        Customer.belongsToMany(models.Book, {
            as: "books",
            through: 'reviews', //Tabla intermedia
            foreignKey: 'customer_id', //Clave foránea que apunta a customers
            otherKey: 'book_id', //Clave foránea que apunta a books
        });

        Customer.hasMany(models.Shopping_Cart, { //Un cliente puede tener muchos carritos de compras
            as: 'shopping_carts',
            foreignKey: 'customer_id'
        });

        Customer.hasOne(models.Address, { //Un cliente tiene una sola dirección
            as: 'address',
            foreignKey: 'customer_id'
        });

    };

    return Customer;
}