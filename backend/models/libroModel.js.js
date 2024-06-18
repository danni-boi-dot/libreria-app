const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./backend/db/libreria.db');

// Modelo para la tabla Libros
const Libro = {
  getAll: function(callback) {
    return db.all("SELECT * FROM Libros", callback);
  },
  getById: function(id, callback) {
    return db.get("SELECT * FROM Libros WHERE id = ?", [id], callback);
  },
  create: function(libro, callback) {
    return db.run("INSERT INTO Libros (titulo, autor, año, categoria, inventario, precio) VALUES (?, ?, ?, ?, ?, ?)",
      [libro.titulo, libro.autor, libro.año, libro.categoria, libro.inventario, libro.precio], callback);
  },
  update: function(libro, callback) {
    return db.run("UPDATE Libros SET titulo = ?, autor = ?, año = ?, categoria = ?, inventario = ?, precio = ? WHERE id = ?",
      [libro.titulo, libro.autor, libro.año, libro.categoria, libro.inventario, libro.precio, libro.id], callback);
  },
  delete: function(id, callback) {
    return db.run("DELETE FROM Libros WHERE id = ?", [id], callback);
  }
};

module.exports = Libro;
