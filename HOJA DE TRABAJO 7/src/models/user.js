const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    dpi: Number,
    usuario: String,
    clave: String,
});

const User = mongoose.model('users', userSchema);

module.exports = User;
