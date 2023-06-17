import ServicioCategoria from '../servicio/categorias.js'
import validaciones  from '../validaciones/categoriasValidaciones.js'
class ControladorCategoria {

    constructor() {
        this.categorias = new ServicioCategoria()
    }

    agregar = async (req, res) => {
        try {
            let categoria = req.body
            const validado = validaciones.validar(categoria)
            if (validado.result) {
                console.log(categoria);
                const respuesta = await this.categorias.agregar(categoria)
                res.status(200).send(respuesta);
            }
            else {
                throw validado.error;
            }
          } catch (error) {
            console.log(error.message)
            res.status(500).send(error.message);
          }

    }


    editar = async (req, res) => {
        try {
            let categoria = req.body
            const validado = validaciones.validarEdicionCategoria(categoria.email,categoria.nombre,categoria.presupuesto)
            if (validado.result) {
            await this.categorias.editar(categoria)
            res.status(200).send("Categoria editada correctamente");
        }
        else {
            throw validado.error;
            }
          } catch (error) {
            console.log(error.message)
            res.status(500).send(error.message);
          }
    }

    eliminar = async (req, res) => {
        try {
            let categoria = req.body
            await this.categorias.eliminar(categoria)
            res.status(200).send("Categoria eliminada correctamente");
        }
        catch (e) {
            res.status(500).send("Error al eliminar la categoria: ", e);
        }
    }

    listar = async (req, res) => {
        const email = req.params.email
        await this.categorias.listar(email)
            .then(categorias => {
                res.status(200).json(categorias);
            })
            .catch(error => {
                res.status(500).send("Error interno del servidor.", error);
            });
    };
}

export default ControladorCategoria