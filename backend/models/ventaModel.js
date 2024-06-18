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

// Modelo de Venta
const Venta = {
  // Obtener todas las ventas
  getAll: (callback) => {
    const db = openDatabase();
    const sql = `SELECT * FROM Ventas`;
    db.all(sql, [], (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
    closeDatabase(db);
  },

  // Obtener una venta por su ID
  getById: (id, callback) => {
    const db = openDatabase();
    const sql = `SELECT * FROM Ventas WHERE id = ?`;
    db.get(sql, [id], (err, row) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, row);
      }
    });
    closeDatabase(db);
  },

  // Crear una nueva venta
  create: (venta, callback) => {
    const db = openDatabase();
    const sql = `INSERT INTO Ventas (fecha, titulo, cantidad, precio_total) VALUES (?, ?, ?, ?)`;
    db.run(sql, [venta.fecha, venta.titulo, venta.cantidad, venta.precio_total], (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
    closeDatabase(db);
  },

  // Actualizar una venta existente
  update: (venta, callback) => {
    const db = openDatabase();
    const sql = `UPDATE Ventas SET fecha = ?, titulo = ?, cantidad = ?, precio_total = ? WHERE id = ?`;
    db.run(sql, [venta.fecha, venta.titulo, venta.cantidad, venta.precio_total, venta.id], (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
    closeDatabase(db);
  },

  // Eliminar una venta por su ID
  delete: (id, callback) => {
    const db = openDatabase();
    const sql = `DELETE FROM Ventas WHERE id = ?`;
    db.run(sql, [id], (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
    closeDatabase(db);
  },

  // Calcular ganancias totales
  calcularGanancias: (callback) => {
    const db = openDatabase();
    const sql = `SELECT SUM(precio_total) AS ganancias FROM Ventas`;
    db.get(sql, [], (err, row) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, row.ganancias || 0);
      }
    });
    closeDatabase(db);
  }
};

module.exports = Venta;
