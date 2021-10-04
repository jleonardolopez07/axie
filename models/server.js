const express = require('express');
const cors = require('cors');
const router = require('../routes/usuarios');
const { dbConnection } = require('../database/confing');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //conectar a la base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Routes app
        this.routes();
    }

    async conectarDB() {
        await dbConnection()
    }

    middlewares() {

        // CORS
        this.app.use(cors())

        //Lectura y parseo del body
        this.app.use(express.json());

        //Direcvtorio publico
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server runing in port:',
                this.port);
        })
    }
}

module.exports = Server;