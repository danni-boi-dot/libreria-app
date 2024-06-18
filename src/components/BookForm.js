import React, { useState } from 'react';

const BookForm = ({ onAddBook }) => {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [año, setAño] = useState('');
  const [categoria, setCategoria] = useState('');
  const [inventario, setInventario] = useState('');
  const [precio, setPrecio] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newBookData = {
      titulo,
      autor,
      año: parseInt(año),
      categoria,
      inventario: parseInt(inventario),
      precio: parseFloat(precio)
    };
    onAddBook(newBookData); // Llama a la función para registrar el libro en el backend
    // Limpiar campos después de enviar el formulario
    setTitulo('');
    setAutor('');
    setAño('');
    setCategoria('');
    setInventario('');
    setPrecio('');
  };

  return (
    <div>
      <h2>Agregar Libro</h2>
      <form onSubmit={handleSubmit}>
        <label>Título:</label>
        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
        <br />
        <label>Autor:</label>
        <input type="text" value={autor} onChange={(e) => setAutor(e.target.value)} required />
        <br />
        <label>Año:</label>
        <input type="number" value={año} onChange={(e) => setAño(e.target.value)} required />
        <br />
        <label>Categoría:</label>
        <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} required />
        <br />
        <label>Inventario:</label>
        <input type="number" value={inventario} onChange={(e) => setInventario(e.target.value)} required />
        <br />
        <label>Precio:</label>
        <input type="number" step="0.01" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
        <br />
        <button type="submit">Registrar Libro</button>
      </form>
    </div>
  );
};

export default BookForm;
