'use strict';

const validator = require('validator');
const Informacion = require('../models/informacion');

const controller = {

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

            //Ubicacion
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

        

    },

    update: (req, res) => {
        //id: 605c219d818ec13374f314c1

        //Recoger el id por url
        const infoId = req.params.id;

        //Recoger los datos que llegan por put
        const params = req.body;
        console.log(params);

        //Validar datos
        try{
             //Nombre
             var validate_nombre = !validator.isEmpty(params.nombre);
             var validate_apellido = !validator.isEmpty(params.apellido);
 
             //Contacto
             var validate_telefono = validator.isNumeric(params.telefono);
             var validate_email = validator.isEmail(params.email);
 
             //Redes
             var validate_urlInstagram = validator.isURL(params.urlInstagram);
             var validate_urlFacebook = validator.isURL(params.urlFacebook);
 
             //Ubicacion
             var validate_lat = validator.isDecimal(params.lat);
             var validate_lgn = validator.isDecimal(params.lgn);
             var validate_zoom = validator.isNumeric(params.zoom);
        } catch(err){
            return res.status(404).send({
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

            const newInfo = {
                nombre: {
                    nombre: params.nombre,
                    apellido: params.apellido
                },
                contacto: {
                    telefono: params.telefono,
                    email: params.email
                },
                redes: {
                    urlInstagram: params.urlInstagram,
                    urlFacebook: params.urlFacebook
                },
                ubicacion: {
                    lat: params.lat,
                    lgn: params.lgn,
                    zoom: params.zoom
                }
            };

            //Find and Update
            Informacion.findByIdAndUpdate({_id: infoId}, newInfo, {new: true}, (err, infoUpdated) => {
                if(err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar'
                    });
                }

                if(!infoUpdated){
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el articulo'
                    });
                }
                //Devolver respuesta
                return res.status(200).send({
                    status: 'success',
                    infoUpdated
                });
            });
            
        } else {
            return res.status(500).send({
                status: 'error',
                message: 'La validacion no es correcta'
            });
        }
    },

    getInfo: (req, res) => {
        const query = Informacion.find({});

        //Se limita la busqueda solo a un elemento
        query.limit(1);

        query.sort('-id').exec((err, info) =>{
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: "Error al devolver la informacion"
                });
            }

            if(!info){
                return res.status(404).send({
                    status: 'error',
                    message: 'No se encontro la informacion'
                });
            }

            return res.status(200).send({
                status: 'success',
                info
            });
        });
    }
};

module.exports = controller;