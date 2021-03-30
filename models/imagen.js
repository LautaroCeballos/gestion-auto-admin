'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImagenSchema = new Schema({
    src: String,
    alt: String,
    tag: String
});

const Imagen = mongoose.model('Imagen', ImagenSchema);

module.exports = Imagen;