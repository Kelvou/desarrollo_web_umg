const express = require('express');
const app = express();
const port = 3000;

// Importa el módulo para manejar la ruta de registro
const registroRouter = require('./routes/registro');

app.use('/api/registro', registroRouter);

app.listen(port, () => {
  console.log(`Se está ejecutando en localhost, puerto: ${port}`);
});