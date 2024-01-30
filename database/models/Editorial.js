module.exports = (sequelize, dataTypes) => {
    let alias = "Editorials";
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
        tableName: "editorials",
        timestamps: false
    }

    const Editorial = sequelize.define(alias, cols, config);

    Editorial.associate = (models) => { 
        Editorial.hasMany(models.Book, { //Una editorial puede publicar muchos libros
            as: "books",
            foreignKey: 'editorial_id' 
        }); 
    };
    
    return Editorial;
}