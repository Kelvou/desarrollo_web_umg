// controllers/accidentController.js
const accidenteSchema = require('../utils/accidenteSchema');

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://kelvin:mongopass@ht6-kelvin.ns2oilw.mongodb.net/";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function listarAccidentes(req, res) {
  try {
    const collection = client.db('HT6-Kelvinumg').collection('CargaDatosHT5');
    const data = await collection.find().project(accidenteSchema()).limit(5).toArray();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
}

async function obtenerAccidentePorReportNumber(req, res) {
  const reportNumber = req.params.reportNumber;
  try {
    const collection = client.db('HT6-Kelvinumg').collection('CargaDatosHT5');
    const accidente = await collection.findOne({ "Report Number": reportNumber }, { projection: accidenteSchema() });

    if (accidente) {
      res.json(accidente);
    } else {
      res.status(404).json({ error: 'Accidente no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el accidente' });
  }
}

async function nuevoAccidente(req, res) {
  try {
    const collection = client.db('HT6-Kelvinumg').collection('CargaDatosHT5');
    const accidentData = req.body;
    const result = await collection.insertOne(accidentData);
    if (result.acknowledged === true) {
      res.json({ message: 'Accidente insertado con éxito' });
    } else {
      res.status(500).json({ error: 'Error al insertar el accidente' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al insertar el accidente' });
  }
}

async function modificarAccidente(req, res) {
  try {
    const collection = client.db('HT6-Kelvinumg').collection('CargaDatosHT5');
    const reportNumber = req.params.reportNumber;
    const updatedData = req.body;

    const result = await collection.updateOne(
      { "Report Number": reportNumber },
      { $set: updatedData }
    );

    if (result.matchedCount > 0) {
      res.json({ message: 'Accidente actualizado con éxito' });
    } else {
      res.status(404).json({ error: 'Accidente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el accidente' });
  }
}

async function eliminarAccidente(req, res) {
  try {
    const collection = client.db('HT6-Kelvinumg').collection('CargaDatosHT5');
    const reportNumber = req.params.reportNumber;

    const result = await collection.deleteOne({ "Report Number": reportNumber });

    if (result.deletedCount === 1) {
      res.json({ message: 'Accidente eliminado con éxito' });
    } else {
      res.status(404).json({ error: 'Accidente no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el accidente' });
  }
}

module.exports = {
  listarAccidentes,
  obtenerAccidentePorReportNumber,
  nuevoAccidente,
  modificarAccidente,
  eliminarAccidente
};