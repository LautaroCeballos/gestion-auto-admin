'use strict';

const validator = require('validator');
const Informacion = require('../models/informacion');

const controller = {
    metodoDePuerba: (req, res) => {
        console.log("Este es el controlador de Informacion");
    },

    save: (req, res) => {
        return res.status(200).send({
            status: 'success',
            message: 'Todo en Orden'
        });
    } 
};

module.exports = controller;