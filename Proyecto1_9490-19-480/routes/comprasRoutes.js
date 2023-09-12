const express = require('express');
const { verifyToken } = require('../controllers/controllers');

const CarritoSchema = require('../models/cart');
const BitacoraSchema = require('../models/bitacora');

const router = express.Router();

// Módulo Compra
// GET - TODAS LAS COMPRAS DE UN CLIENTE
router.get('/compra', verifyToken, async (req, res) => {
    try {
        const carritoEncontrado = await BitacoraSchema.findOne({ "dpi": req.dpi });
        if (carritoEncontrado !== null) {
            res.json(carritoEncontrado);
        } else {
            res.status(404).json({ error: 'No se encontraron productos' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


// POST - AGREGAR PRODUCTOS AL CARRITO
router.post('/compra', verifyToken, async (req, res) => {
    try {
        const productosComprados = await CarritoSchema.findOne({ "dpi": req.dpi });

        if (productosComprados === null) {
            return res.status(404).json({ error: 'No hay productos agregados' });
        }

        let nuevaCompra = await BitacoraSchema.findOne({ "dpi": req.dpi });

        if (!nuevaCompra) {
            nuevaCompra = new BitacoraSchema({
                dpi: req.dpi,
                productos: [],
                total: 0,
            });
        }

        const productosCarrito = productosComprados.productos;

        productosCarrito.forEach((producto) => {
            const productoEnBitacora = nuevaCompra.productos.find(p => p.identificador === producto.identificador);

            if (!productoEnBitacora) {
                nuevaCompra.productos.push(producto);
                nuevaCompra.total += producto.precioDescuento * producto.cantidad;
            }
        });

        await nuevaCompra.save();

        await CarritoSchema.updateOne({ "dpi": req.dpi }, { $pull: { productos: { identificador: { $in: productosCarrito.map(p => p.identificador) } } } });

        const carrito = await CarritoSchema.findOne({ "dpi": req.dpi });
        if (carrito) {
            const nuevoTotalCarrito = carrito.productos.reduce((total, producto) => total + (producto.precioDescuento * producto.cantidad), 0);
            carrito.total = nuevoTotalCarrito;
            await carrito.save();
        }
        return res.status(200).json({ mensaje: 'Productos comprados agregados a la bitácora' });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;