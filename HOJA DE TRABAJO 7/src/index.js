const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://user:pass@ht6-kelvin.ns2oilw.mongodb.net/HT7', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Conexión exitosa a MongoDB'))
    .catch(error => console.error('MongoDB retornó un error en su conexión: ', error));

app.use('/proyecto', authRoutes);

app.listen(port, () => {
    console.log(`Se está ejecutando en localhost, puerto: ${port}`);
});
