import { useState, useEffect } from 'react'
function ProductsPanel() {
    let [products, setProducts] = useState([]);
    useEffect(()=>{
    fetch('http://localhost:3030/api/books')
        .then(res => res.json())   
        .then(({ products }) => {
            setProducts( products );
            console.log( products );
          })   
        .catch(err => console.log(err));
    },[]);
    return (
        <div>
            <h3>Totales de Productos</h3>
            <ul>
            {products.map(product => (
                    <li key={product.id + product.name}>{product.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default ProductsPanel;