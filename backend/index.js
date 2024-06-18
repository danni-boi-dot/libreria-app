const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./backend/db/libreria.db');

const librosRouter = require('./routes/libros');
const categoriasRouter = require('./routes/categorias');
const autoresRouter = require('./routes/autores');
const ventasRouter = require('./routes/ventas');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/libros', librosRouter);
app.use('/api/categorias', categoriasRouter);
app.use('/api/autores', autoresRouter);
app.use('/api/ventas', ventasRouter);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});


// Creación de tablas
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS Libros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    autor TEXT NOT NULL,
    año INTEGER,
    categoria TEXT NOT NULL,
    inventario INTEGER,
    precio REAL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS Categorias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    descripcion TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS Autores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS Ventas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fecha TEXT,
    titulo TEXT,
    cantidad INTEGER,
    precio_total REAL
  )`);

  // Inserción de datos
  db.run("INSERT INTO Autores (nombre) VALUES ('F. Scott Fitzgerald')");
  db.run("INSERT INTO Autores (nombre) VALUES ('Carl Sagan')");

  db.run("INSERT INTO Categorias (nombre, descripcion) VALUES ('Ficción', 'Obras de ficción literaria.')");
  db.run("INSERT INTO Categorias (nombre, descripcion) VALUES ('Ciencia', 'Libros de temática científica.')");
  db.run("INSERT INTO Categorias (nombre, descripcion) VALUES ('Historia', 'Libros relacionados con historia.')");
  db.run("INSERT INTO Categorias (nombre, descripcion) VALUES ('No Ficción', 'Libros basados en hechos reales.')");

  db.run("INSERT INTO Libros (titulo, autor, año, categoria, inventario, precio) VALUES ('El Gran Gatsby', 'F. Scott Fitzgerald', 1925, 'Ficción', 20, 15.99)");
  db.run("INSERT INTO Libros (titulo, autor, año, categoria, inventario, precio) VALUES ('Cosmos', 'Carl Sagan', 1980, 'Ciencia', 10, 19.99)");

  db.run("INSERT INTO Ventas (fecha, titulo, cantidad, precio_total) VALUES ('2023-10-01', 'El Gran Gatsby', 3, 15.99)");
  db.run("INSERT INTO Ventas (fecha, titulo, cantidad, precio_total) VALUES ('2023-10-02', 'Cosmos', 2, 19.99)");

  console.log('Datos insertados correctamente.');

  // Cerrar la conexión con la base de datos
  db.close();
});
