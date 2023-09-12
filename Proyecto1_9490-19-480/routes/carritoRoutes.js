const express = require('express');
const jwt = require('jsonwebtoken');

const { verifyToken } = require('../controllers/controllers');

const ProductoSchema = require('../models/product');
const CarritoSchema = require('../models/cart');

const router = express.Router();

// Módulo Carrito de Compra
// GET - TODOS LOS PRODUCTOS DEL CARRITO
router.get('/carrito', verifyToken, async (req, res) => {
    try {
        const carritoEncontrado = await CarritoSchema.findOne({ "dpi": req.dpi });
        if (carritoEncontrado !== null) {
            res.json(carritoEncontrado);
        } else {
            res.status(404).json({ error: 'No existe el producto solicitado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// GET - AGREGA PRODUCTOS AL CARRITO
router.post('/carrito', verifyToken, async (req, res) => {
    const idBuscar = req.body.identificador;
    const cantidadAgregar = req.body.cantidad;

    try {
        const productoEncontrado = await ProductoSchema.findOne({ "identificador": idBuscar });

        if (productoEncontrado === null) {
            return res.status(404).json({ error: 'No existe el producto solicitado' });
        }

        const dpiUsuario = req.dpi;

        let carrito = await CarritoSchema.findOne({ "dpi": dpiUsuario });

        if (!carrito) {
            carrito = new CarritoSchema({
                dpi: dpiUsuario,
                productos: [],
                total: 0,
            });
        }

        const productoEnCarrito = carrito.productos.find(p => p.identificador === idBuscar);

        if (productoEnCarrito) {
            return res.status(400).json({ mensaje: 'El producto ya está en el carrito' });
        }

        if (productoEncontrado.disponibilidad < cantidadAgregar) {
            return res.status(400).json({ error: 'No hay suficiente disponibilidad' });
        }

        carrito.productos.push({
            identificador: productoEncontrado.identificador,
            nombre: productoEncontrado.nombre,
            marca: productoEncontrado.marca,
            disponibilidad: productoEncontrado.disponibilidad,
            descuento: productoEncontrado.descuento,
            precio: productoEncontrado.precio,
            precioDescuento: productoEncontrado.precioDescuento,
            imagen: productoEncontrado.imagen,
            descripcion: productoEncontrado.descripcion,
            categorias: productoEncontrado.categorias,
            cantidad: cantidadAgregar
        });

        carrito.total += productoEncontrado.precioDescuento * cantidadAgregar;

        productoEncontrado.disponibilidad -= cantidadAgregar;
        await productoEncontrado.save();

        await carrito.save();

        return res.status(200).json({ mensaje: 'Producto agregado al carrito' });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// DELETE - QUITAR PRODUCTO DEL CARRITO
router.delete('/carrito', verifyToken, async (req, res) => {
    const idBuscar = req.body.identificador;

    try {
        const carrito = await CarritoSchema.findOne({ "dpi": req.dpi });

        if (carrito !== undefined) {
            const productoIndex = carrito.productos.findIndex(p => p.identificador == idBuscar);

            if (productoIndex !== -1) {
                const productoEliminado = carrito.productos[productoIndex];

                const productoEncontrado = await ProductoSchema.findOne({ "identificador": idBuscar });
                productoEncontrado.disponibilidad += productoEliminado.cantidad;
                await productoEncontrado.save();

                carrito.total -= productoEliminado.precioDescuento * productoEliminado.cantidad;

                carrito.productos.splice(productoIndex, 1);
                await carrito.save();

                return res.status(200).json({ mensaje: 'Producto eliminado del carrito' });
            } else {
                return res.status(404).json({ error: 'El producto no existe en el carrito' });
            }
        } else {
            return res.status(404).json({ error: 'No existe el carrito solicitado' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;