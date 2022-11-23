//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Videojuego controller para los métodos definidos
const usuarioController = require("../controllers/usuarioController");

//Definición de rutas para generos
router.get("/", usuarioController.get);

router.get("/:id", usuarioController.getById);

router.post("/",usuarioController.create);

router.put("/:id",usuarioController.update);

module.exports = router;