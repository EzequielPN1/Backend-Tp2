import ConexionMongo from './conexionMongoDb.js'
import { ObjectId } from 'mongodb';


class GastosMongoDb {

  constructor() {
    this.gastosCollection = null;
    this.init();
  }

  async init() {
    try {
      this.gastosCollection =  ConexionMongo.gastosColeccion()
    } catch (error) {
      console.error(error);
    }
  }


  agregar = async (gasto) => {
    try {
      const { email, titulo, monto, fecha, idCategoria, descripcion } = gasto;

      const newGasto = {
        email: email,
        titulo: titulo,
        monto: monto,
        fecha: fecha,
        idCategoria: idCategoria,
        descripcion: descripcion,
      };

      await this.gastosCollection.insertOne(newGasto)

      return "Gasto registrado correctamente";
    } catch (error) {
      console.log(error);
      throw new Error("Error al agregar gasto: " + error.message);
    }
  };


  listar = async (email) => {
    try {
      const gastos = await this.gastosCollection.find({ email }).toArray();
      return gastos;
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener la lista de gastos: " + error.message);
    }
  };

  eliminar = async (gasto) => {
    try {

      const { _id } = gasto;
      const objectId = new ObjectId(_id);

      await this.gastosCollection.deleteOne({ _id: objectId });

      return "Gasto eliminado correctamente";
    } catch (error) {
      console.log(error);
      throw new Error("Error al eliminar gasto: " + error.message);
    }
  };



  editar = async (gasto) => {
    try {
      const { _id, email, titulo, monto, fecha, idCategoria, descripcion } = gasto;
      const objectId = new ObjectId(_id);
  
      await this.gastosCollection.updateOne({ _id: objectId }, {
        $set: {
          email: email,
          titulo: titulo,
          monto: monto,
          fecha: fecha,
          idCategoria: idCategoria,
          descripcion: descripcion
        }
      });
  
      return "Gasto editado correctamente";
    } catch (error) {
      console.log(error);
      throw new Error("Error al editar gasto: " + error.message);
    }
  };
  
}

export default GastosMongoDb