'use strict';

const express = require('express');
const ImagenController = require('../controllers/imagen');

const router = express.Router();

const multiparty = require('connect-multiparty');
const md_upload = multiparty({uploadDir: './upload/images'})

//Rutas para imagenes
router.post('/save', ImagenController.save);
router.post('/upload-image/:id', md_upload, ImagenController.upload);
router.get('get-image/:image', ImagenController.getImage);

module.exports = router;