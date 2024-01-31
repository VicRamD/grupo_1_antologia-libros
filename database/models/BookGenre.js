module.exports = (sequelize, dataTypes) => {
    let alias = "BookGenre";
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        book_id: {
            type: dataTypes.INTEGER(10)
        },
        genre_id: {
            type: dataTypes.INTEGER(10)
        }
    };

    let config = {
        tableName: "book_genre",
        timestamps: false
    };

    const BookGenre = sequelize.define(alias, cols, config);

    BookGenre.associate = (models) => {

        BookGenre.belongsTo(models.Book, {
            as: "book",
            foreignKey: 'book_id', //Clave foránea que apunta a books
        });

        BookGenre.belongsTo(models.Genre, { //Un libro puede pertenecer a uno o varios géneros
            as: "genre",
            foreignKey: 'genre_id', //Clave foránea que apunta a genres
        });
        
    };
    
    return BookGenre;
}