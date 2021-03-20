'use strict'

var express = require('express');
var TestimonioController = require('../controllers/testimonio');

var router = express.Router();

//Rutas para testimonios
router.post('/save', TestimonioController.save);
router.get('/testimonios/:cant?', TestimonioController.getTestimonios);
router.get('/testimonio/:id', TestimonioController.getTestimonio);
router.delete('/testimonio/:id', TestimonioController.delete);

module.exports = router;