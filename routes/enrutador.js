const express = require("express");
const prueba = require("./prueba");
const rutasTipos = require("./rutasTipos");
const plantasTipos = require("./rutasPlantas");
const inicio = require("./inicio");

function routerPlantas(app){
    const router = express.Router();

    app.use("/", router);
    router.use("/prueba", prueba);
    router.use("/tipos", rutasTipos);
    router.use("/plantas", plantasTipos);
    router.use("/inicio", inicio);
}

module.exports = routerPlantas;