require("dotenv").config();
const path = require("path");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const bodyParser = require("body-parser");
const sequelize = require("./db/sequelize");
const configureAssociations = require("./src/models/associations");
const routerPlantas = require("./routes/enrutador");
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware
app.use((req, res, next) => {
    console.log("Middleware funcionando");
    console.log(req.method, req.url);
    next();
});

// Vistas con EJS
app.set("views", "./src/views");
app.set("view engine", "ejs");

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Layouts
app.use(expressLayouts);
app.set("layout", "./layouts/layoutBase");

// Rutas
routerPlantas(app);

// Asociaciones y sincronización
configureAssociations();
sequelize.sync({ alter: true })
    .then(() => {
        console.log('Tablas sincronizadas correctamente');
    })
    .catch(err => {
        console.error('Error al sincronizar las tablas:', err);
    });

// Levantamiento del servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
