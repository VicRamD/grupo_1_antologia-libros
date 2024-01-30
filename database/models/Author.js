module.exports = (sequelize, dataTypes) => {
    let alias = "Authors";
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING,
        }/*,
        last_name: {
            type: dataTypes.STRING,
            allowNull: false,
        }*/
    };
    
    let config = {
        tableName: "authors",
        timestamps: false
    }

    const Author = sequelize.define(alias, cols, config);

    Author.associate = (models) => {
        Author.belongsToMany(models.Book, { //Un autor tiene uno o varios libros
            as: "books",
            through: 'book_author', //Tabla intermedia
            foreignKey: 'author_id', //Clave foránea que apunta a authors
            otherKey: 'book_id', //Clave foránea que apunta a books
        });
    };
    
    return Author;
}