const sqlite3 = require('sqlite3').verbose();

// Función para abrir la conexión a la base de datos
function openDatabase() {
  return new sqlite3.Database('./backend/db/libreria.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Conexión establecida con la base de datos SQLite');
  });
}

// Función para cerrar la conexión a la base de datos
function closeDatabase(db) {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Conexión cerrada con la base de datos SQLite');
  });
}

// Modelo de Categoría
const Categoria = {
  // Obtener todas las categorías
  getAll: (callback) => {
    const db = openDatabase();
    const sql = `SELECT * FROM Categorias`;
    db.all(sql, [], (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
    closeDatabase(db);
  },

  // Obtener una categoría por su ID
  getById: (id, callback) => {
    const db = openDatabase();
    const sql = `SELECT * FROM Categorias WHERE id = ?`;
    db.get(sql, [id], (err, row) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, row);
      }
    });
    closeDatabase(db);
  },

  // Crear una nueva categoría
  create: (categoria, callback) => {
    const db = openDatabase();
    const sql = `INSERT INTO Categorias (nombre, descripcion) VALUES (?, ?)`;
    db.run(sql, [categoria.nombre, categoria.descripcion], (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
    closeDatabase(db);
  },

  // Actualizar una categoría existente
  update: (categoria, callback) => {
    const db = openDatabase();
    const sql = `UPDATE Categorias SET nombre = ?, descripcion = ? WHERE id = ?`;
    db.run(sql, [categoria.nombre, categoria.descripcion, categoria.id], (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
    closeDatabase(db);
  },

  // Eliminar una categoría por su ID
  delete: (id, callback) => {
    const db = openDatabase();
    const sql = `DELETE FROM Categorias WHERE id = ?`;
    db.run(sql, [id], (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
    closeDatabase(db);
  }
};

module.exports = Categoria;
