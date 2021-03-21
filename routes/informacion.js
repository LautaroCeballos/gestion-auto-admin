'use strict'

const express = require('express');
const InformacionController = require('../controllers/informacion');

const router = express.Router();

router.get('/info-pruebas', InformacionController.metodoDePuerba);

router.post('/save', InformacionController.save);

module.exports = router;

