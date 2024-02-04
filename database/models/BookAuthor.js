module.exports = (sequelize, DataTypes) => {
    let alias = "BookAuthor";
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
        author_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
    };
    
    let config = {
        tableName: "book_author",
        timestamps: false
    }

    const BookAuthor = sequelize.define(alias, cols, config);

    BookAuthor.associate = (models) => {

        BookAuthor.belongsTo(models.Book, {
            as: "book",
            foreignKey: 'book_id', //Clave foránea que apunta a books
        });

        BookAuthor.belongsTo(models.Author, { 
            as: "author",
            foreignKey: 'author_id', //Clave foránea que apunta a authors
        });
        
    };

    return BookAuthor;
}