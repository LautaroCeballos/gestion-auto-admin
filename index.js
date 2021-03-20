'use strict';

const mongoose = require('mongoose');
const app = require('./app');

require('dotenv').config();

const port = process.env.PORT || 3000;

const user = process.env.USER;
const password = process.env.PASSWORD;
const dbname = process.env.DBNAME;
const uri = `mongodb+srv://${user}:${password}@autoadministrable.zmlcr.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

mongoose.connect(uri, 
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('La conexion a la base de datos se ha realizado correctamente');
        
        //Crear servidor y escuchar peticiones http
        app.listen(port, () => {
            console.log('Servidor corriendo en https://localhost:' + port);
        });

    }).catch(error => console.log(error));
