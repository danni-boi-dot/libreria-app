const express = require('express');
const router = express.Router();
const Libro = require('../models/libro');

router.get('/buscar', async (req, res) => {
    const query = req.query.query;
    try {
        const libros = await Libro.buscarPorQuery(query);
        res.json(libros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
