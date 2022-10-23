//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Videojuego controller para los métodos definidos
const comandaController = require("../controllers/comandaController");
const detalleComandaController = require("../controllers/detallecomandaController.js");
const detallePagoController = require("../controllers/detallepagoController");

//Definición de rutas para generos

router.get("/:id", comandaController.getById);
router.get("/detalle/:id", detalleComandaController.getById);
router.get("/pago/:id", detallePagoController.getById);
router.get("/pago/:id", detallePagoController.getById);

module.exports = router;