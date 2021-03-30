'use strict';

const validator = require('validator');
const fs = require('fs');
const path= require('path');

const Imagen = require('../models/imagen');

const controller = {
    save: (req, res) => {
        //Recoger parametros por post
        const params = req.body;

        //Validad datos
        try{
            var validate_alt = !validator.isEmpty(params.alt);
            var validate_tag = !validator.isEmpty(params.tag);
        } catch {
            return res.status(404).send({
                status: 'error',
                message: 'Faltan datos para enviar'
            });
        }

        if(validate_alt && validate_tag){
            // Crear el objeto a guardar
            const imagen = new Imagen();

            //Asignar valores
            imagen.alt = params.alt;
            imagen.tag = params.tag;
            imagen.src = params.src;

            //Guardar la imagen
            imagen.save((err, imagenStored) => {
                if(err || !imagenStored){
                    return res.status(500).send({
                        status: 'error',
                        message: 'La Imagen no se ha guardado'
                    });
                }

                //Devolver una respuesta
                return res.status(200).send({
                    status: 'success',
                    imagenStored
                });
            })

        } else {
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son validos'
            });
        }
    },

    upload: (req, res) => {
        //Configurar el modulo de connect multiparty router/imagen (Listo)
        //Recoger el fichero de la peticion
        let file_name = 'Imagen no subida';

        if(!req.files){
            return res.status(404).send({
                status: 'error',
                message: file_name
            });
        }

        //Conseguir el nombre y la extencion
        const file_path = req.files.file0.path;
        const file_split = file_path.split('\\');
        // *El split funciona para separar la cadena mediante el punto de corte que se le indique ('\\')*

        // Nombre del archivo
        file_name = file_split[2];

        // Extencion del archivo
        const extension_split = file_name.split('\.');
        const file_ext = extension_split[1];

        //Comprobar la extencion (Solo imagenes), si no es valido borrar el fichero
        if(file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && filex_ext != 'gif'){
            // Borrar el archivo subido
            fs.unlink(file_path, (err) => { //Nos permite eliminar un fichero
                return res.status(500).send({
                    status: 'error',
                    message: 'La extension de la imagen no es valida'
                });
            });
        } else {
            const imagenId = req.params.id;

            if(imagenId){
               Imagen.findOneAndUpdate({_id: imagenId}, {image: file_name}, {new: true}, (err, imagenUpdated) => {
                    if(err || !imagenUpdated){
                        return res.status(404).send({
                            status: 'error',
                            message: 'Error al guardar la imagen'
                        });
                    }
                    return res.status(200).send({
                        status: 'success',
                        image: imagenUpdated
                    });
               });
            } 
        }
    },

    getImage: (req, res) => {
        const fileName = req.params.image;
        const path_file = './upload/images' + fileName;

        fs.stat(path_file, (err, stat) => {
            if(err || !stat){
                return res.status(404).send({
                    status: 'error',
                    message: 'La Imagen no existe'
                });
            } else {
                return res.sendFile(path.resolve(path_file));
            }
        });
    }



}

module.exports = controller;