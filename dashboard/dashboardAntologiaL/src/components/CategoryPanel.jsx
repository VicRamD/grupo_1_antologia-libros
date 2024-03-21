import { useState, useEffect } from 'react';
import './categoryPanel.css';

function CategoryPanel() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3030/api/books')
      .then(res => res.json())
      .then(({ countByGenre }) => {
        setGenres(countByGenre);
      })
      .catch(error => console.error('Error al obtener los géneros:', error));
  }, []);

  return (
    <div className='category-panel'>
      <h3>GÉNEROS</h3>
      <ul>
        {Object.keys(genres).map(genre => (
          <li key={genre}>
            {genre}: {genres[genre]} {genres[genre] === 1 ? 'libro' : 'libros'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryPanel;