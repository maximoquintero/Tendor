const express = require("express");
const router = express.Router();
const usuariosControllers = require("../controllers/usuariosControllers");

// Rutas para los usuarios
router.get("/", usuariosControllers.obtenerUsuarios);
router.get("/:id_usuario", usuariosControllers.obtenerUsuariosPorId);
router.post("/", usuariosControllers.crearUsuarios);
router.delete("/:id_usuario", usuariosControllers.eliminarUsuariosPorId);
router.put("/:id_usuario", usuariosControllers.actualizarUsuariosPorId);

module.exports = router;
