//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Videojuego controller para los métodos definidos
const enumController = require("../controllers/enumController");

//Definición de rutas para generos


router.get("/estadosMesa", enumController.getEstadosMesa);
router.get("/roles", enumController.getRoles);
module.exports = router;