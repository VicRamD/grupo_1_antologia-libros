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

function searchProductById(id, products){
    const searchedProduct = products.find((product) => product.id === id);
    return searchedProduct;
}

function searchProductIndex(id, products){
	const index = products.findIndex((product) => product.id === id);
	return index;
}

function searchUserByEmail(email, users){
    const searchedUser = users.find(user => user.email === email);
    return searchedUser;
}

module.exports = {searchItemById, searchItemIndex, searchItemByName, searchProductById, searchProductIndex, searchUserByEmail};