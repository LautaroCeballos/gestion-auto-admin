'use strict';

const validator = require('validator');
var Testimonio = require('../models/testimonio');

const controller = {
    datosCurso: (req, res) => {
        return res.status(200).send({
            curso: 'Master en frameworks JS',
            alumno: 'Lautaro Ceballos'
        });
    },

    test: (req, res) => {
        return res.status(200).send({
            messaje: 'Soy la accion test de mi controllador'
        });
    },

    save: (req, res) => {
        // Recoger parametros por post
        const params = req.body;

        // Validar datos
        try{
            var validate_nombre = !validator.isEmpty(params.nombre);
            var validate_fecha = !validator.isEmpty(params.fecha);
            var validate_clasificacion = !validator.isEmpty(params.clasificacion);
            var validate_detalle = ! validator.isEmpty(params.detalle);

        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar !!'
            });
        }

        if( validate_nombre &&
            validate_fecha &&
            validate_clasificacion &&
            validate_detalle 
        ){
            
            // Crear el objeto a guardar
            const testimonio = new Testimonio();

            // Asignar valores
            testimonio.nombre = params.nombre;
            testimonio.fecha = params.fecha;
            testimonio.clasificacion = params.clasificacion;
            testimonio.detalle = params.detalle;

            // Guardar el articulo
            testimonio.save((err, testimonioStored) => {
                if(err || !testimonioStored ){
                    return res.status(404).send({
                        status: 'error',
                        message: 'El testimonio no se ha guardado'
                    })
                }

                // Devolver una respuesta
                return res.status(200).send({
                    status: 'success',
                    testimonio 
                });

            });
        } else {
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son validos'
            });
        }


    },

    getTestimonios: (req, res) => {
        const query = Testimonio.find({});

        //Por parametros viene la cantidad de resultados que se necesita
        const cantTest = req.params.cant;
        const cantNumber = parseInt(cantTest, 10);
        
        if(cantTest || cantTest != undefined){
            query.limit(cantNumber);
        }

        //Find //El metodo sort se utiliza para ordenar la lista
        query.sort('-_id').exec((err, testimonios) =>{
            if(err){
                return res.status(500).send({
                    status: 'error',
                    messaje: 'Error al devolver los articulos'
                });
            }

            if(!testimonios){
                return res.status(404).send({
                    status: 'error', 
                    messaje: 'No hay articulos para mostrar'
                });
            }

            return res.status(200).send({
                status: 'success',
                testimonios
            });
        });

        
    },

    delete: (req, res) => {
        // Recorrer el id de la url
        const testimonioId = req.params.id;

        // Find and delete
        Testimonio.findOneAndDelete({_id: testimonioId}, (err, testimonioRemoved) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    messaje: 'Error al borrar'
                });
            }

            if(!testimonioRemoved){
                return res.status(404).send({
                    status: 'error',
                    messaje: 'No se ha borrado el articulo, posiblemente no exista'
                });
            }

            return res.status(200).send({
                status: 'success',
                testimonio: testimonioRemoved
            });
        });
    }
}; 

module.exports = controller;