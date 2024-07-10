const express = require("express");
const router = express.Router();
const Plantas = require("../src/models/plantas");
const Tipos = require("../src/models/tipos");
const sequelize = require("../db/sequelize");

// Ruta para mostrar el formulario de creación y lista de tipos
router.get('/', async (req, res) => {
    try {
        const tipos = await Tipos.findAll();
        res.render('tipos/index', { tipos });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Ruta para crear un nuevo tipo
router.post('/', async (req, res) => {
    try {
        await Tipos.create(req.body);
        res.redirect('/tipos');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET para mostrar el formulario de edición de un tipo específico
router.get('/:id/edit', async (req, res) => {
    try {
        const tipo = await Tipos.findByPk(req.params.id);
        if (!tipo) {
            return res.status(404).send('Tipo no encontrado');
        }
        res.render('tipos/edit', { tipo });
    } catch (error) {
        console.error('Error al buscar el tipo:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// POST para actualizar un tipo específico
router.post('/:id/edit', async (req, res) => {
    try {
        const tipo = await Tipos.findByPk(req.params.id);
        if (!tipo) {
            return res.status(404).send('Tipo no encontrado');
        }
        await tipo.update({
            descripcion: req.body.descripcion,
            taxonomia: req.body.taxonomia,
            ciclo_vida: req.body.ciclo_vida,
            origen: req.body.origen,
            estado_conservacion: req.body.estado_conservacion,
            tipo: req.body.tipo
        });
        res.redirect('/tipos'); // Redirecciona a la lista de tipos después de la edición
    } catch (error) {
        console.error('Error al actualizar el tipo:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Ruta para eliminar un tipo

router.post('/delete/:id', async (req, res) => {
    try {
        await Tipos.destroy({
            where: {
                id: req.params.id
            }
        });
        res.redirect('/tipos');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
