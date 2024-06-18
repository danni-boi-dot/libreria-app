const express = require('express');
const router = express.Router();
const Libro = require('../models/libroModel');

// GET - Obtener todos los libros
router.get('/', (req, res) => {
  Libro.getAll((err, libros) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al obtener los libros' });
    }
    res.json(libros);
  });
});

// GET - Obtener un libro por su ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  Libro.getById(id, (err, libro) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al obtener el libro' });
    }
    if (!libro) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }
    res.json(libro);
  });
});

// POST - Crear un nuevo libro
router.post('/', (req, res) => {
  const nuevoLibro = req.body;
  Libro.create(nuevoLibro, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al crear el libro' });
    }
    res.json({ message: 'Libro creado exitosamente' });
  });
});

// PUT - Actualizar un libro existente
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const libroActualizado = req.body;
  libroActualizado.id = id; // Asegurar que el ID coincida
  Libro.update(libroActualizado, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al actualizar el libro' });
    }
    res.json({ message: 'Libro actualizado exitosamente' });
  });
});

// DELETE - Eliminar un libro por su ID
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Libro.delete(id, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al eliminar el libro' });
    }
    res.json({ message: 'Libro eliminado exitosamente' });
  });
});

module.exports = router;
