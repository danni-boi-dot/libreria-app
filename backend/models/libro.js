const db = require('../db');

const Libro = {};

Libro.buscarPorQuery = (query) => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM Libros WHERE titulo LIKE '%${query}%' OR autor LIKE '%${query}%' OR categoria LIKE '%${query}%'`, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

module.exports = Libro;
