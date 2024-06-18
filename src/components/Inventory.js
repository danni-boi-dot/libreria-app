import React from 'react';

const Inventory = ({ inventory }) => {
  return (
    <div>
      <h2>Inventario</h2>
      {Object.keys(inventory).map((categoria) => (
        <div key={categoria}>
          <h3>{categoria}</h3>
          <ul>
            {inventory[categoria].map((book) => (
              <li key={book.id}>
                {book.titulo} - {book.autor} - {book.inventario} unidades
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Inventory;
