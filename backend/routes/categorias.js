const express = require('express');
const router = express.Router();
const Categoria = require('../models/categoriaModel');

// GET - Obtener todas las categorías
router.get('/', (req, res) => {
  Categoria.getAll((err, categorias) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al obtener las categorías' });
    }
    res.json(categorias);
  });
});

// GET - Obtener una categoría por su ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  Categoria.getById(id, (err, categoria) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al obtener la categoría' });
    }
    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.json(categoria);
  });
});

// POST - Crear una nueva categoría
router.post('/', (req, res) => {
  const nuevaCategoria = req.body;
  Categoria.create(nuevaCategoria, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al crear la categoría' });
    }
    res.json({ message: 'Categoría creada exitosamente' });
  });
});

// PUT - Actualizar una categoría existente
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const categoriaActualizada = req.body;
  categoriaActualizada.id = id; // Asegurar que el ID coincida
  Categoria.update(categoriaActualizada, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al actualizar la categoría' });
    }
    res.json({ message: 'Categoría actualizada exitosamente' });
  });
});

// DELETE - Eliminar una categoría por su ID
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Categoria.delete(id, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al eliminar la categoría' });
    }
    res.json({ message: 'Categoría eliminada exitosamente' });
  });
});

module.exports = router;
