import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import RouterUsuario from './router/usuarios.js';
import RouterGasto from './router/gastos.js'
import RouterCategoria from "./router/categorias.js";
import ConexionSqlite from './model/DAO/Sqlite/conexionSqlite.js'
import ConexionMongoDb from './model/DAO/MongoDb/conexionMongoDb.js'


class Server {

  constructor(port, persistencia) {
    this.app = express();
    this.port = port;
    this.persistencia = persistencia;
  }

  async start() {

    this.app.use(bodyParser.json());
    this.app.use(cors());

    this.app.use(new RouterUsuario().start())
    this.app.use('/gastos', new RouterGasto().start())
    this.app.use('/categorias', new RouterCategoria().start())

    if (this.persistencia === 'SQLite') {
      await ConexionSqlite.conectar();
    }

    if (this.persistencia === 'mongoDb') {
      await ConexionMongoDb.conectar();
    }

    const PORT = this.port
    this.server = this.app.listen(PORT,
      () => console.log(`Servidor http express escuchando en http://localhost:${PORT}`)
    )
    this.server.on('error', error => console.log(`Error en servidor: ${error.message}`))

    return this.app
  }


  async stop() {
    this.server.close()
    if (this.persistencia === 'SQLite') {
      await ConexionSqlite.desconectar();
    }

    if (this.persistencia === 'mongoDb') {
      await ConexionMongoDb.desconectar();
    }
  }



}

export default Server