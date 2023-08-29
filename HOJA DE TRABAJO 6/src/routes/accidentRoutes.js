// routes/accidentRoutes.js
const express = require('express');
const accidentController = require('../controllers/accidenteController');
const router = express.Router();

router.get('/listar', accidentController.listarAccidentes);
router.get('/listar/:reportNumber', accidentController.obtenerAccidentePorReportNumber);
router.post('/nuevoAccidente', accidentController.nuevoAccidente);
router.patch('/modificarAccidente/:reportNumber', accidentController.modificarAccidente);
router.delete('/eliminarAccidente/:reportNumber', accidentController.eliminarAccidente);

module.exports = router;