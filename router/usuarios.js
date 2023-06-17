import express from "express";
import ControladorUsuario from '../controlador/usuarios.js'

class RouterUsuario {

    constructor() {
        this.router = express.Router()
        this.controlador = new ControladorUsuario()
    }

    start() {
        
        this.router.get("/",this.controlador.inicio)
        this.router.post("/register", this.controlador.registro)
        this.router.post("/login", this.controlador.login)
        this.router.post("/editarUsuario", this.controlador.editarUsuario)
        this.router.get("/confirmar", this.controlador.confirmar)
        this.router.post("/enviarCorreoNuevaPass", this.controlador.enviarCorreoNuevaPass)
        this.router.post("/cambiarContrasenia", this.controlador.cambiarContrasenia)
        this.router.delete("/eliminarCuenta",this.controlador.eliminarCuenta)
        this.router.post("/devolverUsuarioValidado",this.controlador.devolverUsuarioValidado)
        this.router.post("/validarToken",this.controlador.validarToken)

        return this.router
    }

}

export default RouterUsuario