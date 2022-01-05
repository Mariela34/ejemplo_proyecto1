'use strict';

let mongoose = require('mongoose');

let usuarioSchema = new mongoose.Schema({
    tipo_usuario: { type: String, required: true},
    cedula: { type: String, required: true, unique: true },
    nombre_completo: { type: String, required: true},
    fecha_nacimiento: { type: String, required: true},
    edad: { type: Number, required: true },
    correo: { type: String, required: true, unique:true },
    foto_usuario: { type: String, required: true},
    contrasenna: { type: String, required: true},
});

module.exports = mongoose.model('Usuario', usuarioSchema);