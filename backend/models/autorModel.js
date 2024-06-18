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

// Modelo de Autor
const Autor = {
  // Obtener todos los autores
  getAll: (callback) => {
    const db = openDatabase();
    const sql = `SELECT * FROM Autores`;
    db.all(sql, [], (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
    closeDatabase(db);
  },

  // Obtener un autor por su ID
  getById: (id, callback) => {
    const db = openDatabase();
    const sql = `SELECT * FROM Autores WHERE id = ?`;
    db.get(sql, [id], (err, row) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, row);
      }
    });
    closeDatabase(db);
  },

  // Crear un nuevo autor
  create: (autor, callback) => {
    const db = openDatabase();
    const sql = `INSERT INTO Autores (nombre) VALUES (?)`;
    db.run(sql, [autor.nombre], (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
    closeDatabase(db);
  },

  // Actualizar un autor existente
  update: (autor, callback) => {
    const db = openDatabase();
    const sql = `UPDATE Autores SET nombre = ? WHERE id = ?`;
    db.run(sql, [autor.nombre, autor.id], (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
    closeDatabase(db);
  },

  // Eliminar un autor por su ID
  delete: (id, callback) => {
    const db = openDatabase();
    const sql = `DELETE FROM Autores WHERE id = ?`;
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

module.exports = Autor;
