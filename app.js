'use strict'
// Cargar modulos de node para crear servidor
const express = require('express');
const bodyParser = require('body-parser');


// Ejecutar express (http)
const app = express();

// Cargar ficheros rutas
const testimonio_routes = require('./routes/testimonio');
const informacion_routes = require('./routes/informacion');

// Middlewares
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Añadir prefijos a rutas / Cargar
app.use('/comentarios', testimonio_routes);
app.use('/informacion', informacion_routes);


// Exportar modulo (fichero actual)
module.exports = app;
