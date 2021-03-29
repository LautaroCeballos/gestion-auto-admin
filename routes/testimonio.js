'use strict'

const express = require('express');
const TestimonioController = require('../controllers/testimonio');

const router = express.Router();

//Rutas para testimonios
router.post('/saveTestimonios', TestimonioController.save);
router.get('/getTestimonios/:cant?', TestimonioController.getTestimonios);
router.get('/getTestimonio/:id', TestimonioController.getTestimonio);
router.delete('/deleteTestimonio/:id', TestimonioController.delete);

module.exports = router;