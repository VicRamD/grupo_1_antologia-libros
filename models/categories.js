class bookCategory {
    constructor(id, name){
        this.id = id;
        this.name = name;
    };
}

const cat1 = new bookCategory(1, 'Ciencia Ficción');
const cat2 = new bookCategory(2, 'Ciencias Naturales');
const cat3 = new bookCategory(3, 'Ciencias Sociales');
const cat4 = new bookCategory(4, 'Para niños');
const cat5 = new bookCategory(5, 'Fantasia');
const cat6 = new bookCategory(6, 'Historia');
const cat7 = new bookCategory(7, 'Arte');
const cat8 = new bookCategory(8, 'Filosofía');
const cat9 = new bookCategory(9, 'Cocina');
const cat10 = new bookCategory(10, 'Drama');
const cat11 = new bookCategory(11, 'Novela');
const cat12 = new bookCategory(12, 'Aventura');
const cat13 = new bookCategory(13, 'Política');
const cat14 = new bookCategory(14, 'Desarrollo Personal');
const cat15 = new bookCategory(15, 'Biografía');
const cat16 = new bookCategory(15, 'Deporte');
const cat17 = new bookCategory(15, 'Ocio');
const cat18 = new bookCategory(15, 'Humor');

const categories = [cat1, cat2, cat3, cat4, cat5, cat6, cat7, cat8, cat9, cat10, cat11, cat12, cat13, cat14, cat15, cat16, cat17, cat18];

module.exports = categories;