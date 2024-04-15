const express = require("express");
const sensorHumedadControllers = require('../controllers/sensorHumedadControllers')
const router = express.Router();

router.post("/", sensorHumedadControllers .crearDatoHumedad);
router.get("/", sensorHumedadControllers .verDatoHumedad);
router.get("/:id", sensorHumedadControllers .verDatoHumedadId);
router.put("/:id", sensorHumedadControllers .editarDatoHumedadId);
router.delete("/:id", sensorHumedadControllers .eliminarDatoHumedad);


module.exports = router