const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/confing');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            usuarios: '/api/usuarios',
            becados: '/api/becados',
            buscar: '/api/buscar'
        }

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
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.usuarios, require('../routes/usuarios'))
        this.app.use(this.paths.becados, require('../routes/becados'))
        this.app.use(this.paths.buscar, require('../routes/buscarBecado'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server runing in port:',
                this.port);
        })
    }
}

module.exports = Server;