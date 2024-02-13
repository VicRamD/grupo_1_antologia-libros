module.exports = (sequelize, dataTypes) => {
    let alias = "Genre";
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
        tableName: "genres",
        timestamps: false
    }

    const Genre = sequelize.define(alias, cols, config);

    Genre.associate = (models) => {
        Genre.belongsToMany(models.Book, { //A un género pueden pertenecer uno o muchos libros
            as: "books", 
            through: 'book_genre', //Tabla intermedia 
            foreignKey: 'genre_id', //Clave foránea que apunta a genres
            otherKey: 'book_id', //Clave foránea que apunta a books
            timestamps: false
        });
    };

    return Genre;
}