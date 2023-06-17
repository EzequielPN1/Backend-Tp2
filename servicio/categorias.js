import ModelFactory from "../model/DAO/categoriasFactory.js"
import config from "../config.js";


class ServicioCategoria {

    constructor() {
        this.model = ModelFactory.get(config.MODO_PERSISTENCIA)
    }

    agregar = async categoria => {
        const categoriaGuardada = await this.model.agregar(categoria)
        return categoriaGuardada
    }

    editar = async (categoria) => {
        return await this.model.editar(categoria)
    }

    eliminar = async (categoria) => {
        return await this.model.eliminar(categoria)
    }

    listar = async (email) => {
        return await this.model.listar(email)
    }

    devolverId = async (nombre, email) => {
        return await this.model.devolverId(nombre, email)
    }
}

export default ServicioCategoria