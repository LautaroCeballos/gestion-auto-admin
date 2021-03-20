'use strict'

var express = require('express');
var TestimonioController = require('../controllers/testimonio');

var router = express.Router();

//Rutas de Prueba
router.get('/test-de-controlador', TestimonioController.test);
router.post('/datos-curso', TestimonioController.datosCurso);

//Rutas para testimonios
router.post('/save', TestimonioController.save);
router.get('/testimonios/:cant?', TestimonioController.getTestimonios);
router.delete('/testimonio/:id', TestimonioController.delete);

module.exports = router;