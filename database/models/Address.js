module.exports = (sequelize, dataTypes) => {
    let alias = "Address";
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        customer_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        street: {
            type: dataTypes.STRING,
        },
        city: {
            type: dataTypes.STRING
        },
        state: {
            type: dataTypes.STRING,
        },
        postal_code: {
            type: dataTypes.INTEGER(15),
            allowNull: false,
        },
        country: {
            type: dataTypes.STRING,
        }
    };
    
    let config = {
        tableName: "addresses",
        timestamps: false
    }

    const Address = sequelize.define(alias, cols, config);

    Address.associate = (models) => {
        Address.belongsTo(models.Customer, {
            as: "customers",
            foreignKey: 'customer_id'
        });
        /*Address.belongsTo(models.Customer);, { //Una dirección pertenece a un solo cliente
            as: "customers",
            foreignKey: 'customer_id' 
        }); */

        Address.hasMany(models.Order,{ // Una dirección puede tener muchos pedidos
            as: "orders",
            foreignKey: 'address_id' 
        });

    };

    return Address;
}