import { useState, useEffect } from 'react'
import './productsPanel.css';

function ProductsPanel() {
    let [products, setProducts] = useState([]);
    let [selectedProduct, setSelectedProduct] = useState(null);
    useEffect(()=>{
    fetch('http://localhost:3030/api/books')
        .then(res => res.json())   
        .then(({ products }) => {
            setProducts( products );
          })   
        .catch(err => console.log(err));
    },[]);

    const handleClick = (product) => {
        setSelectedProduct(product);
    }
    return (
        <div className='productsPanel'>
        <h3>Totales de Productos</h3>
        <ul>
            {products.map(product => (
                <li key={product.id + product.name} onClick={() => handleClick(product)}>
                    {product.name}
                </li>
            ))}
        </ul>
        {selectedProduct && (
            <div className='descriptionProductsPanel'>
                <h4>{selectedProduct.name}</h4>
                <p>Author: {selectedProduct.author}</p>
                <p>Géneros: {selectedProduct.genres.join(', ')}</p>     
                <p>Descripción: {selectedProduct.description}</p>   
            </div>
            )}
            </div>
    );
}

export default ProductsPanel;