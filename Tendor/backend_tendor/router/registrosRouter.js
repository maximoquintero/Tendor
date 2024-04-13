const express = require("express");
const router = express.Router();
const registrosControllers = require("../controllers/registrosControllers");

// Rutas para los registros
router.get("/", registrosControllers.obtenerRegistros);
router.get("/:id_registro", registrosControllers.obtenerRegistrosPorId);
// router.post("/", registrosControllers.crearRegistros);
// router.delete("/:id_registro", registrosControllers.eliminarRegistrosPorId);
// router.put("/:id_registro", registrosControllers.actualizarRegistrosPorId);

module.exports = router;