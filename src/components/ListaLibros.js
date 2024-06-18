import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Libro from './Libro';

const ListaLibros = () => {
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/libros')
      .then(response => {
        setLibros(response.data);
      })
      .catch(error => {
        console.error('Error al cargar los libros:', error);
      });
  }, []);

  return (
    <div className="lista-libros">
      <h2>Consulta de Libros</h2>
      {libros.map(libro => (
        <Libro key={libro.id} libro={libro} />
      ))}
    </div>
  );
};

export default ListaLibros;
