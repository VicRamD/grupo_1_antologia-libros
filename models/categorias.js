class CategoriaLibro {
    constructor(id, nombre){
        this.id = id;
        this.nombre = nombre;
    };
}

const cat1 = new CategoriaLibro(1, 'Ciencia Ficción');
const cat2 = new CategoriaLibro(2, 'Ciencias Naturales');
const cat3 = new CategoriaLibro(3, 'Ciencias Sociales');
const cat4 = new CategoriaLibro(4, 'Para niños');
const cat5 = new CategoriaLibro(5, 'Fantasia');
const cat6 = new CategoriaLibro(6, 'Historia');
const cat7 = new CategoriaLibro(7, 'Arte');
const cat8 = new CategoriaLibro(8, 'Filosofía');
const cat9 = new CategoriaLibro(9, 'Cocina');
const cat10 = new CategoriaLibro(10, 'Drama');
const cat11 = new CategoriaLibro(11, 'Novela');
const cat12 = new CategoriaLibro(12, 'Aventura');
const cat13 = new CategoriaLibro(13, 'Política');
const cat14 = new CategoriaLibro(14, 'Desarrollo Personal');

const categorias = [cat1, cat2, cat3, cat4, cat5, cat6, cat7, cat8, cat9, cat10, cat11, cat12, cat13, cat14];

module.exports = categorias;