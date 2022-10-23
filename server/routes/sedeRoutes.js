//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Videojuego controller para los métodos definidos
const sedeController = require("../controllers/sedeController");

//Definición de rutas para generos
router.get("/", sedeController.get);

router.get("/:id", sedeController.getById);



module.exports = router;