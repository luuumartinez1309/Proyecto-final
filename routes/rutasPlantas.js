const express = require("express");
const router = express.Router();
const Plantas = require("../src/models/plantas");
const Tipos = require("../src/models/tipos");
const sequelize = require("../db/sequelize");

// Ruta para renderizar la vista de plantas
router.get('/', async (req, res) => {
    try {
        const tipos = await Tipos.findAll();
        const plantas = await Plantas.findAll({ include: Tipos });
        res.render('plantas/index', { tipos, plantas });
    } catch (error) {
        console.error('Error al obtener datos:', error);
        res.status(500).send('Error al obtener datos');
    }
});

// Ruta para crear una nueva planta
router.post('/', async (req, res) => {
    try {
        await Plantas.create(req.body);
        res.redirect('/plantas');
    } catch (error) {
        console.error('Error al crear planta:', error);
        res.status(500).send('Error al crear planta');
    }
});

// GET para mostrar el formulario de edición de una planta específica
router.get('/:id/edit', async (req, res) => {
    try {
        const planta = await Plantas.findByPk(req.params.id);
        const tipos = await Tipos.findAll();
        if (!planta) {
            return res.status(404).send('Planta no encontrada');
        }
        res.render('plantas/edit', { planta, tipos });
    } catch (error) {
        console.error('Error al buscar la planta:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// POST para actualizar una planta específica
router.post('/:id/edit', async (req, res) => {
    try {
        const planta = await Plantas.findByPk(req.params.id);
        if (!planta) {
            return res.status(404).send('Planta no encontrada');
        }
        await planta.update({
            nombre: req.body.nombre,
            tipo_reproduccion: req.body.tipo_reproduccion,
            ambiente_crecimiento: req.body.ambiente_crecimiento,
            frutos: req.body.frutos,
            flores: req.body.flores,
            tipo_iluminacion: req.body.tipo_iluminacion,
            tipo_id: req.body.tipo_id
        });
        res.redirect('/plantas'); // Redirecciona a la lista de plantas después de la edición
    } catch (error) {
        console.error('Error al actualizar la planta:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Ruta para eliminar una planta
router.post('/delete/:id', async (req, res) => {
    try {
        await Plantas.destroy({
            where: {
                id: req.params.id
            }
        });
        res.redirect('/plantas');
    } catch (error) {
        console.error('Error al eliminar planta:', error);
        res.status(500).send('Error al eliminar planta');
    }
});

module.exports = router;