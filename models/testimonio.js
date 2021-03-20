'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TestimonioSchema = new Schema({
    nombre: String,
    fecha: Date,
    clasificacion: Number,
    detalle: String
});

const Testimonio = mongoose.model('Testimonio', TestimonioSchema);
//guradra documentos de este tipo y con la estructura dentro de la coleccion

module.exports = Testimonio;