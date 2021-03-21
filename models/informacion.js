'use scrict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InformacionSchema = new Schema({
    nombre: {
        nombre: String,
        apellido: String
    },
    contacto: {
        telefono: Number,
        email: String
    },
    redes: {
        urlInstagram: String,
        urlFacebook: String
    },
    ubicacion: {
        lat: Number,
        lgn: Number,
        zoom: Number
    }
});

const Informacion = mongoose.model('Informacion', InformacionSchema);

module.exports = Informacion;