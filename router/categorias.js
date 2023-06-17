import express from "express"
import ControladorCategoria from '../controlador/categorias.js'

class RouterCategoria {

    constructor() {
        this.router = express.Router()
        this.controlador = new ControladorCategoria()
    }

    start() {
        this.router.post("/agregar", this.controlador.agregar)
        this.router.post("/editar", this.controlador.editar)
        this.router.post("/eliminar", this.controlador.eliminar)
        this.router.get("/listar/:email", this.controlador.listar)

        return this.router
    }
}

export default RouterCategoria