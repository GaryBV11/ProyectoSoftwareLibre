//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Videojuego controller para los métodos definidos
const comandaController = require("../controllers/comandaController");
const detalleComandaController = require("../controllers/detallecomandaController.js");
const detallePagoController = require("../controllers/detallepagoController");

//Definición de rutas para generos
router.get("/", comandaController.get);

//router.get("/last", comandaController.getUltima);

router.post("/",comandaController.create);

router.get("/:id", comandaController.getById);

router.put("/:id", comandaController.update);

router.post("/nota", comandaController.notaComanda);

router.get("/last/:id", comandaController.getUltimaByIdMesa);

router.get("/detalles/:id", detalleComandaController.getByComanda);

router.get("/pagos/:id", detallePagoController.getByComanda);

router.get("/pago/:id", detallePagoController.getById);

router.post("/pago",detallePagoController.create);

router.post("/detalles/create",detalleComandaController.create);

router.post("/detalles/delete",detalleComandaController.delete);

router.get("/reporte/fechas", comandaController.reporteXFechas);

router.post("/reporte/fechas", comandaController.reporteXFechasFiltro);

router.get("/reporte/metodo", comandaController.reporteMetodo);

router.post("/reporte/metodo", comandaController.reporteMetodoFiltro);

router.post("/reporte/varios", comandaController.reporteVarios);

module.exports = router;