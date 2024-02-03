module.exports = (sequelize, dataTypes) => {
    let alias = "User";
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        first_name: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        category_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        pf_image: {
            type: dataTypes.STRING(50)
        },
        phone_number: {
            type: dataTypes.INTEGER(15)
        }
    };
    
    let config = {
        tableName: "users",
        timestamps: false
    }

    const User = sequelize.define(alias, cols, config);

    User.associate = (models) => {
        User.hasMany(models.Order, { 
            as: "orders",
            foreignKey: 'user_id' 
        }); 

        User.belongsTo(models.UserCategory, {
            as: "category",
            foreignKey: 'category_id' 
        })
            
        /*Customer.hasMany(models.Review, { //Un cliente puede dejar una o varias reseñas
            as: "reviews",
            foreignKey: 'customer_id' 
        }); */
    
        User.belongsToMany(models.Book, {
            as: "review",
            through: 'reviews', //Tabla intermedia
            foreignKey: 'user_id', //Clave foránea que apunta a customers
            otherKey: 'book_id', //Clave foránea que apunta a books
        });
    
        User.hasOne(models.Shopping_Cart, { //Un cliente puede tener muchos carritos de compras
            as: 'shopping_carts',
            foreignKey: 'user_id'
        });
    
        User.hasOne(models.Address, { //Un cliente tiene una sola dirección
            as: 'address',
            foreignKey: 'customer_id'
        });
    
    };

    return User;
}