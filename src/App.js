import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchForm from './components/SearchForm';
import BookList from './components/BookList';
import SaleForm from './components/SaleForm';
import Inventory from './components/Inventory';
import ProfitCalculation from './components/ProfitCalculation';
import BookForm from './components/BookForm'; // Nuevo componente para el formulario de registro

import './App.css'

const App = () => {
  const [books, setBooks] = useState([]);
  const [inventory, setInventory] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [totalGanancias, setTotalGanancias] = useState(0);

  useEffect(() => {
    fetchInventory();
    calculateGanancias();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/libros');
      const inventoryData = groupBooksByCategory(response.data);
      setInventory(inventoryData);
    } catch (error) {
      console.error('Error al cargar el inventario:', error);
    }
  };

  const groupBooksByCategory = (books) => {
    const grouped = {};
    books.forEach((book) => {
      if (!grouped[book.categoria]) {
        grouped[book.categoria] = [];
      }
      grouped[book.categoria].push(book);
    });
    return grouped;
  };

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/libros/buscar?query=${query}`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error al buscar libros:', error);
    }
  };

  const handleSale = async (libroId, cantidad) => {
    try {
      await axios.post('http://localhost:3000/api/ventas/registrar', { libroId, cantidad });
      fetchInventory(); // Actualizar inventario después de la venta
      calculateGanancias(); // Actualizar ganancias después de la venta
    } catch (error) {
      console.error('Error al registrar la venta:', error);
    }
  };

  const handleAddBook = async (newBookData) => {
    try {
      await axios.post('http://localhost:3000/api/libros/registrar', newBookData);
      fetchInventory(); // Actualizar inventario después de registrar el nuevo libro
    } catch (error) {
      console.error('Error al registrar el libro:', error);
    }
  };

  const calculateGanancias = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/ventas/calcular-ganancias');
      setTotalGanancias(response.data.ganancias);
    } catch (error) {
      console.error('Error al calcular las ganancias:', error);
    }
  };

  return (
    <div>
      <h1>Sistema de Gestión de Inventario de Librería</h1>

      <BookForm onAddBook={handleAddBook} />

      <BookList books={books} />

      <SaleForm libros={books} onSale={handleSale} />

      <Inventory inventory={inventory} />

      <SearchForm onSearch={handleSearch} />

      <ProfitCalculation totalGanancias={totalGanancias} />
    </div>
  );
}

export default App;
