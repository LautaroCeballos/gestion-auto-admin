'use strict'

const express = require('express');
const InformacionController = require('../controllers/informacion');

const router = express.Router();

router.get('/info-pruebas', InformacionController.metodoDePuerba);

router.post('/saveInfo', InformacionController.save);
router.get('/getInfo', InformacionController.getInfo);
router.put('/updateInfo/:id', InformacionController.update);

module.exports = router;

