module.exports = (sequelize, dataTypes) => {
    let alias = "Book";
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        title: {
            type: dataTypes.STRING,
            allowNull: false
        },
        abstract: {
            type: dataTypes.TEXT,
        },
        editorial_id: {
            type: dataTypes.INTEGER(10),
        },
        isbn: {
            type: dataTypes.INTEGER(25),
            allowNull: false
        },
        date: {
            type: dataTypes.DATE,
        },
        price: {
            type: dataTypes.FLOAT(20, 2),
            allowNull: false
        },
        stock: {
            type: dataTypes.INTEGER(6),
            allowNull: false
        },
    };

    let config = {
        tableName: "books",
        timestamps: false
    }

    const Book = sequelize.define(alias, cols, config);

    Book.associate = (models) => {

        Book.belongsToMany(models.Author, { //Un libro tiene uno o varios autores
            as: "authors",
            through: 'book_author', //Tabla intermedia
            foreignKey: 'book_id', //Clave foránea que apunta a books
            otherKey: 'author_id', //Clave foránea que apunta a authors
        });

        Book.belongsToMany(models.Genre, { //Un libro puede pertenecer a uno o varios géneros
            as: "genres",
            through: 'books_genres', //Tabla intermedia
            foreignKey: 'book_id', //Clave foránea que apunta a books
            otherKey: 'genre_id', //Clave foránea que apunta a genres
        });

        //Book.hasMany(models.Review); //Un libro puede tener una o muchas reseñas
        
        Book.belongsTo(models.Editorial, { //Un libro puede ser publicado por una editorial
            as: "editorial",
            foreignKey: 'editorial_id'
        }); 
        
        Book.belongsToMany(models.Order, { //Un libro puede pertenecer a uno o varios pedidos
            as: "orders",
            through: 'books_orders', //Tabla intermedia
            foreignKey: 'book_id', //Clave foránea que apunta a books
            otherKey: 'order_id', //Clave foránea que apunta a orders
        });

        Book.belongsToMany(models.Shopping_Cart, { //Un libro puede pertenecer a varios carritos de compras
            as: "shopping_carts", //Alias de la relación
            through: 'cart_items', //Tabla intermedia 
            foreignKey: 'book_id', //Clave foránea que apunta a shopping_carts
            otherKey: 'cart_id', //Clave foránea que apunta a books
        });

        Book.belongsToMany(models.Customer, {
            as: "customers",
            through: 'reviews', //Tabla intermedia
            foreignKey: 'book_id', //Clave foránea que apunta a books
            otherKey: 'customer_id', //Clave foránea que apunta a customers
        });
    };
    
    return Book;
}