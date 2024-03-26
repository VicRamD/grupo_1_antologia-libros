import { useState, useEffect } from 'react'
import './productsPanel.css';

function ProductsPanel() {
    let [page, setPage] = useState(0);
    let [products, setProducts] = useState([]);
    let [selectedProduct, setSelectedProduct] = useState(null);
    useEffect(()=>{
    fetch('http://localhost:3030/api/books/page?page='+page)
        .then(res => res.json())   
        .then(({ products }) => {
            if(products.length){
                setProducts( products );
            } else {
                setPage(page - 8);
            }
          })   
        .catch(err => console.log(err));
    },[page]);

    const handleClick = (product) => {
        setSelectedProduct(product);
    }

    const handleClickSig = () => {
        setPage(page + 8);
    }

    const handleClickAnt = () => {
        if(page > 0){
            setPage(page - 8);
        }
        
    }

    return (
        <div className='productsPanel'>
        <h3>Totales de Productos</h3>
        <ul className='books'>
            {products.map(product => (
                <li className='book titleLi' key={product.id + product.name} onClick={() => handleClick(product)}>
                    {product.name}
                </li>
            ))}
        </ul>
        <div className='buttonRow'>
            <button type='button' onClick={() => handleClickAnt()}>Ant</button>
            <div className='pageNumber'>Pág: {(page/8)+1}</div>
            <button type='button' onClick={() => handleClickSig()}>Sig</button>
        </div>
        {selectedProduct && (
            <div className='descriptionProductsPanel'>
                <h4 className='bookTitle'>{selectedProduct.name}</h4>
                <p><b>Author: </b>{selectedProduct.author.join(', ')}</p>
                <p><b>Géneros: </b>{selectedProduct.genres.join(', ')}</p>     
                <p className='description'>Descripción: {selectedProduct.description}</p>   
            </div>
            )}
            </div>
    );
}

export default ProductsPanel;