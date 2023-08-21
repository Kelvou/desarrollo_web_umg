const express = require('express');
const router = express.Router();

// Importa el módulo para manejar las rutas de ciudadanos
const ciudadanosRouter = require('./logica');

// Ruta para crear ciudadanos
router.use('/ciudadanos', ciudadanosRouter);

module.exports = router;