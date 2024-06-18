import React, { useState } from 'react';

const SaleForm = ({ libros, onSale }) => {
  const [selectedBook, setSelectedBook] = useState('');
  const [cantidad, setCantidad] = useState(0);

  const handleSale = (e) => {
    e.preventDefault();
    onSale(selectedBook, cantidad);
    setSelectedBook('');
    setCantidad(0);
  };

  return (
    <form onSubmit={handleSale}>
      <select value={selectedBook} onChange={(e) => setSelectedBook(e.target.value)}>
        <option value="">Selecciona un libro</option>
        {libros.map((book) => (
          <option key={book.id} value={book.id}>
            {book.titulo} - {book.inventario} unidades en stock
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Cantidad"
        value={cantidad}
        onChange={(e) => setCantidad(Number(e.target.value))}
      />
      <button type="submit">Registrar Venta</button>
    </form>
  );
}

export default SaleForm;
