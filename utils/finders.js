const db = require('../database/models');

function searchItemById(id, list){
    const searchedItem = list.find((item) => item.id === id);
    return searchedItem;
}

function searchItemIndex(id, list){
	const index = list.findIndex((item) => item.id === id);
	return index;
}

//en caso de que el nombre/name no pueda repetirse
function searchItemByName(name, list){
    const searchedItem = list.find((item) => item.name === name);
    return searchedItem;
}

async function searchProductById(id){
    const searchedProduct = await db.Book.findByPk(Number(id), {
        include: [{association: 'editorial'}, {association: 'genres'}, {association: 'authors'}]
    });
    return JSON.parse(JSON.stringify(searchedProduct));
}

function searchProductIndex(id, products){
	const index = products.findIndex((product) => product.id === id);
	return index;
}

async function searchUserByEmail(email){
    const searchedUser = await db.User.findOne({
        where: {
            email
        },
        include: [{association: 'category'}]
    }).catch(error => {
        console.log(error);
    })

    const searchedUserObject = JSON.parse(JSON.stringify(searchedUser));
    //console.log(searchedUserObject)

    return searchedUserObject;
}

/*async function searchGenreById(id){
    const searcedGenre = await db.Genre.findOne({
        where: {
            id
        }
    }).catch(error => {
        console.log(error);
    })

    const searchedGenreObject = JSON.parse(JSON.stringify(searcedGenre));
    //console.log(searchedUserObject)

    return searchedGenreObject;
}*/

module.exports = {searchItemById, searchItemIndex, searchItemByName, 
    searchProductById, searchProductIndex, searchUserByEmail};