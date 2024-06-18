const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const librosRouter = require('./routes/libros');
const categoriasRouter = require('./routes/categorias');
const autoresRouter = require('./routes/autores');
const ventasRouter = require('./routes/ventas');

const app = express();
const PORT = process.env.PORT || 5000;

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
