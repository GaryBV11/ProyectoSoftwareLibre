//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Videojuego controller para los métodos definidos
const productoController = require("../controllers/productoController");

//Definición de rutas para generos
router.get("/", productoController.get);

router.post("/",productoController.create);

router.get("/:id", productoController.getById);

router.put("/:id",productoController.update);

router.get("/sede/:id", productoController.getById);

router.get("/sedes/:id", productoController.getBySede);

module.exports = router;