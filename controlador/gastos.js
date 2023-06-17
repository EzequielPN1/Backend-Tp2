import ServicioGasto from '../servicio/gastos.js'
import validaciones from '../validaciones/gastosValidaciones.js'

class ControladorGasto {

    constructor() {
        this.gastos = new ServicioGasto()
    }

    agregar = async (req, res) => {
        try {
            let gasto = req.body
            const validado = validaciones.validar(gasto)
            if (validado.result) {
                console.log(gasto);
                await this.gastos.agregar(gasto)
                res.status(200).send("Gasto ingresado correctamente");
                console.log(req.body);
            }
            else {
                throw validado.error;
            }
        }
        catch (error) {
            console.log(error.message)
            res.status(500).send(error.message);
          }
    }

    editar = async (req, res) => {
        try {
          let gasto = req.body 
          const validado = validaciones.validarGastoEditado(gasto.titulo, gasto.monto, gasto.fecha, gasto.descripcion)
          if (validado.result) {
            await this.gastos.editar(gasto)
            res.status(200).send("Gasto editado correctamente");
          } else {
            throw validado.error;
          }
        } catch (error) {
          console.log(error.message)
          res.status(500).send(error.message);
        }
      }
      

    eliminar = async (req, res) => {
        try {
            let gasto = req.body
            await this.gastos.eliminar(gasto)
            res.status(200).send("Gasto eliminado correctamente");
        }
        catch (e) {
            res.status(500).send("Error al eliminar gasto: ", e);
        }
    }

    listar = async (req, res) => {
        try {
            let email = req.params.email;
            const gastos = await this.gastos.listar(email);
            res.status(200).json(gastos);
        } catch (error) {
            res.status(500).send("Error al listar.");
        }
    };

}

export default ControladorGasto