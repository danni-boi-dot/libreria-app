import React from 'react';

const BookList = ({ books }) => {
  return (
    <div>
      <h2>Lista de Libros</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <strong>Título:</strong> {book.titulo} - 
            <strong> Autor:</strong> {book.autor} - 
            <strong> Categoría:</strong> {book.categoria} - 
            <strong> Inventario:</strong> {book.inventario}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
