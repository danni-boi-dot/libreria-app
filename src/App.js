import React from 'react';
import ListaLibros from './components/ListaLibros';
import './App.css'; // Archivo para los estilos globales
import axios from 'axios';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Librería</h1>
      </header>
      <main>
        <ListaLibros />
      </main>
    </div>
  );
}

export default App;
