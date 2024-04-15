const express = require("express");
const sensorLluviaControllers = require('../controllers/sensorLluviaController')
const router = express.Router();

router.get("/", sensorLluviaControllers.verDatoLluvia );
router.get("/:id", sensorLluviaControllers.verDatoLluviaId);

module.exports = router;