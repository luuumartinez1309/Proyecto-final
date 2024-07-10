const express = require("express");
const router = express.Router();
const Plantas = require("../src/models/plantas");
const Tipos = require("../src/models/tipos");
const sequelize = require("../db/sequelize");

// Ruta para crear un nuevo tipo
router.post('/tipos', async (req, res) => {
    try {
        const tipo = await Tipos.create(req.body);
        res.status(201).json(tipo);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

// Ruta para crear una nueva planta
router.post('/plantas', async (req, res) => {
    try {
        const planta = await Plantas.create(req.body);
        res.status(201).json(planta);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Ruta para obtener todas las plantas con su tipo asociado
router.get('/traerplantas', async (req, res) => {
    try {
        const plantas = await Plantas.findAll({ include: Tipos });
        res.status(200).json(plantas);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Ruta para obtener todos los tipos con sus plantas asociadas
router.get('/traertipos', async (req, res) => {
    try {
        const tipos = await Tipos.findAll({ include: Plantas });
        res.status(200).json(tipos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/ambos', async (req, res) => {
    try{
        const tipos = await Tipos.findAll({ include: Plantas });
        res.status(200).json(tipos);
    }catch(error){
        res.status(400).json({ error: error.message });
    }
})

module.exports = router;