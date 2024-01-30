module.exports = (sequelize, dataTypes) => {
    let alias = "Users";
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
        category: {
            type: dataTypes.STRING,
            allowNull: false
        },
        pf_image: {
            type: dataTypes.INTEGER(15)
        }
    };
    
    let config = {
        tableName: "users",
        timestamps: false
    }

    const User = sequelize.define(alias, cols, config);

    User.associate = (models) => {
        User.hasOne(models.Customer, { 
            as: "customers",
            foreignKey: 'user_id' }); 
    };

    return User;
}