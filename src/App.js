import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/libros/buscar?query=${searchTerm}`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error al buscar libros:', error);
    }
  };

  return (
    <div>
      <h1>Librería</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar Libros</button>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.titulo} - {book.autor} - {book.categoria}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
