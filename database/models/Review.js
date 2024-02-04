module.exports = (sequelize, DataTypes) => {
    let alias = "Review";
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
        user_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        rating: {
            type: DataTypes.FLOAT(5,1),
            allowNull: false,
        },
    };
    
    let config = {
        tableName: "reviews",
        timestamps: false
    }

    const Review = sequelize.define(alias, cols, config);

    Review.associate = (models) => {

        Review.belongsTo(models.Book, {
            as: "book",
            foreignKey: 'book_id', //Clave foránea que apunta a books
        });

        Review.belongsTo(models.User, {
            as: "user",
            foreignKey: 'user_id', //Clave foránea que apunta a users
        });
        
    };

    return Review;
}