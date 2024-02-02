module.exports = (sequelize, dataTypes) => {
    let alias = "UserCategory";
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        }
    };
    
    let config = {
        tableName: "user_categories",
        timestamps: false
    }

    const UserCategory = sequelize.define(alias, cols, config);

    UserCategory.associate = (models) => {
        UserCategory.hasMany(models.User, { //A una categoria pueden pertenecer uno o muchos usuarios
            as: "users",
            foreignKey: 'category_id', //Clave foránea que apunta a users
        });
    };

    return UserCategory;
}