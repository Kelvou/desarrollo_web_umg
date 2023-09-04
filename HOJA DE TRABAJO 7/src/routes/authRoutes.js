const express = require('express');
var { verifyToken, login } = require('../controllers/authControllers');

const router = express.Router();

router.post('/login/:dpi', login);
router.get('/data', verifyToken, (req, res) => {
    res.json({ "message": "Información protegida", "usuario": req.usuario, "clave": req.clave });
});

module.exports = router;
