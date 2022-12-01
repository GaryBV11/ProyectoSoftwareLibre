//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Videojuego controller para los métodos definidos
const comandaController = require("../controllers/comandaController");
const detalleComandaController = require("../controllers/detallecomandaController.js");
const detallePagoController = require("../controllers/detallepagoController");

//Definición de rutas para generos
router.get("/", comandaController.get);

router.post("/",comandaController.create);

router.get("/:id", comandaController.getById);

router.put("/:id", comandaController.update);

router.get("/last/:id", comandaController.getUltimaByIdMesa);

router.get("/detalles/:id", detalleComandaController.getByComanda);

router.get("/pagos/:id", detallePagoController.getByComanda);

router.get("/pago/:id", detallePagoController.getById);

router.post("/detalles/create",detalleComandaController.create);

router.post("/detalles/delete",detalleComandaController.delete);

module.exports = router;