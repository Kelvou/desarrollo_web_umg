// app.js
const express = require('express');
const app = express();
const port = 3000;
const accidentRoutes = require('./src/routes/accidentRoutes');

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kelvin:mongopass@ht6-kelvin.ns2oilw.mongodb.net/";
const client = new MongoClient(uri);

const run = async () => {
  try {
    await client.connect();
    await client.db("kelvin").command({ ping: 1 });
    console.log("Conexión exitosa con MongoDB");
  } catch (error) {
    console.error(error);
  }
};

app.use(express.json());

app.use('/api', accidentRoutes);

app.listen(port, () => {
  console.log(`Se está ejecutando en localhost, puerto: ${port}`);
  run().catch(console.dir);
});
