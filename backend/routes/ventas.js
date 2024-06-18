const express = require('express');
const router = express.Router();
const Venta = require('../models/ventaModel');

// GET - Obtener todas las ventas
router.get('/', (req, res) => {
  Venta.getAll((err, ventas) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al obtener las ventas' });
    }
    res.json(ventas);
  });
});

// GET - Obtener una venta por su ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  Venta.getById(id, (err, venta) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al obtener la venta' });
    }
    if (!venta) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }
    res.json(venta);
  });
});

// POST - Registrar una nueva venta
router.post('/registrar', (req, res) => {
  const nuevaVenta = req.body;
  Venta.create(nuevaVenta, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al registrar la venta' });
    }
    res.json({ message: 'Venta registrada exitosamente' });
  });
});

// PUT - Actualizar una venta existente
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const ventaActualizada = req.body;
  ventaActualizada.id = id; // Asegurar que el ID coincida
  Venta.update(ventaActualizada, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al actualizar la venta' });
    }
    res.json({ message: 'Venta actualizada exitosamente' });
  });
});

// DELETE - Eliminar una venta por su ID
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Venta.delete(id, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al eliminar la venta' });
    }
    res.json({ message: 'Venta eliminada exitosamente' });
  });
});

// GET - Calcular ganancias totales
router.get('/calcular-ganancias', (req, res) => {
  Venta.calcularGanancias((err, ganancias) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al calcular las ganancias' });
    }
    res.json({ ganancias });
  });
});

module.exports = router;
