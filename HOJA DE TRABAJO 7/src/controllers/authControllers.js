const jwt = require('jsonwebtoken');
const secretKey = 'desarrolloweb';
const Segundos = 60;

const User = require('../models/user');

function verifyToken(req, res, next) {
    var token = req.headers['authorization'];
    if (typeof token !== 'undefined') {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                res.sendStatus(403); // Forbidden
            } else {
                req.usuario = decoded.usuario;
                req.clave = decoded.clave;
                next();
            }
        });
    } else {
        res.sendStatus(401); // Unauthorized
    }
}

async function login(req, res) {
    var dpiBuscar = req.params.dpi;
    var usuario = req.body.usuario;
    var clave = req.body.clave;
    try {
        var usuarioEncontrado = await User.findOne({ "dpi": dpiBuscar, "usuario": usuario, "clave": clave });
        session = usuarioEncontrado;
        if (usuarioEncontrado !== null) {
            var token = jwt.sign({ usuario: usuario, clave: clave }, secretKey, { expiresIn: Segundos + 's' });
            res.json({ token });
        } else {
            res.status(404).json({ error: 'Error con los datos o no existe' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports = { verifyToken, login };
