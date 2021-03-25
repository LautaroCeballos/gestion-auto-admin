'use strict';

const validator = require('validator');
const Informacion = require('../models/informacion');

const controller = {
    metodoDePuerba: (req, res) => {
        console.log("Este es el controlador de Informacion");
    },

    save: (req, res) => {
        // Recoger parametros por post
        const params = req.body;

        //Validar datos
        try {
            //Nombre
            var validate_nombre = !validator.isEmpty(params.nombre);
            var validate_apellido = !validator.isEmpty(params.apellido);

            //Contacto
            var validate_telefono = validator.isNumeric(params.telefono);
            var validate_email = validator.isEmail(params.email);

            //Redes
            var validate_urlInstagram = validator.isURL(params.urlInstagram);
            var validate_urlFacebook = validator.isURL(params.urlFacebook);

            var validate_lat = validator.isDecimal(params.lat);
            var validate_lgn = validator.isDecimal(params.lgn);
            var validate_zoom = validator.isNumeric(params.zoom);

        } catch (err) {
            return res.status(500).send({
                status: 'error',
                message: 'Faltan datos por enviar'
            });
        }

        if (
            validate_nombre && validate_apellido &&
            validate_telefono && validate_email &&
            validate_urlInstagram && validate_urlFacebook &&
            validate_lat && validate_lgn && validate_zoom
        ) {
            //Crear objeto a guardar
            const informacion = new Informacion();

            //Asignar valores

            informacion.nombre = {
                nombre: params.nombre,
                apellido: params.apellido
            };

            informacion.contacto = {
                telefono: params.telefono,
                email: params.email
            }

            informacion.redes = {
                urlInstagram: params.urlInstagram,
                urlFacebook: params.urlFacebook
            }

            informacion.ubicacion = {
                lat: params.lat,
                lgn: params.lgn,
                zoom: params.zoom
            }

            //Guardar el Info
            informacion.save((err, infoStored) => {
                if (err || !infoStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'El documento no se ha guardado'
                    })
                }

                //Devolver una respuesta
                return res.status(200).send({
                    status: 'success',
                    informacion
                });
            });
        } else {
            return res.status(500).send({
                status: 'error',
                message: 'Los datos no son validos'
            });
        }


    }
};

module.exports = controller;