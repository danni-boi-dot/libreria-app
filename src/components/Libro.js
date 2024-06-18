import React, { useState } from 'react';
import axios from 'axios';

const Libro = ({ libro }) => {
  const [ventaCantidad, setVentaCantidad] = useState('');
  const [mensajeVenta, setMensajeVenta] = useState('');

  const handleVentaSubmit = (event) => {
    event.preventDefault();
    if (!ventaCantidad) {
      setMensajeVenta('Por favor, ingresa la cantidad.');
      return;
    }

    axios.post('http://localhost:5000/api/ventas', {
      libro_id: libro.id,
      cantidad: ventaCantidad
    })
      .then(response => {
        setMensajeVenta(response.data.mensaje);
        // Actualizar el inventario de libros (puedes usar un contexto para esto)
        // o hacer una nueva solicitud GET para actualizar la lista de libros
      })
      .catch(error => {
        setMensajeVenta('Error al registrar la venta.');
        console.error('Error al registrar la venta:', error);
      });

    // Limpiar el formulario
    setVentaCantidad('');
  };

  return (
    <div className="libro">
      <strong>{libro.titulo}</strong> - {libro.autor} ({libro.año}), {libro.categoria}<br />
      Inventario: {libro.inventario}, Precio: ${libro.precio.toFixed(2)}<br /><br />
      
      <form onSubmit={handleVentaSubmit}>
        <label>
          Cantidad:
          <input type="number" value={ventaCantidad} onChange={(e) => setVentaCantidad(e.target.value)} />
        </label>
        <button type="submit">Registrar Venta</button>
      </form>
      {mensajeVenta && <p>{mensajeVenta}</p>}
    </div>
  );
};

export default Libro;
