// routes/ciudadanos.js
const express = require('express');
const router = express.Router();

let ciudadanos = [];

router.use(express.json());

router.post('/', (req, res) => {
  var { dpi, nombres, apellidos, fechaNacimiento, estadoCivil } = req.body;

  ciudadanos.push({
    dpi,
    nombres,
    apellidos,
    fechaNacimiento,
    estadoCivil
  });

  res.json({ respuesta: 'Registro con éxito' });
});

router.patch('/:dpi', (req, res) => {
  var dpiBuscar = req.params.dpi;
  var { nombres, apellidos, fechaNacimiento, estadoCivil } = req.body;

  const ciudadanoIndex = ciudadanos.findIndex(ciudadano => ciudadano.dpi == dpiBuscar);

  if (ciudadanoIndex === -1) {
    return res.json({ error: 'No se encontró el ciudadano' });
  }

  if (nombres) ciudadanos[ciudadanoIndex].nombres = nombres;
  if (apellidos) ciudadanos[ciudadanoIndex].apellidos = apellidos;
  if (fechaNacimiento) ciudadanos[ciudadanoIndex].fechaNacimiento = fechaNacimiento;
  if (estadoCivil) ciudadanos[ciudadanoIndex].estadoCivil = estadoCivil;

  res.json({ respuesta: 'Cambios realizados con éxito' });
});

router.delete('/:dpi', (req, res) => {
  var dpiBuscar = req.params.dpi;

  const ciudadanoIndex = ciudadanos.findIndex(ciudadano => ciudadano.dpi == dpiBuscar);

  if (ciudadanoIndex === -1) {
    return res.json({ error: 'No se encontró el ciudadano' });
  }

  ciudadanos.splice(ciudadanoIndex, 1);

  res.json({ respuesta: 'Ciudadano eliminado con éxito' });
});

router.get('/:dpi', (req, res) => {
  var dpiBuscar = req.params.dpi;
  var encontrado = ciudadanos.filter(ciudadano => ciudadano.dpi == dpiBuscar);

  if (encontrado.length === 0) {
    res.json({ error: 'No se encontró el ciudadano' });
  }

  res.json(encontrado);
});

router.get('/', (req, res) => {
  res.json(ciudadanos);
});

module.exports = router;