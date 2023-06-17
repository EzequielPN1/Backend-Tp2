import ConexionSqlite from './conexionSqlite.js'

class CategoriaSqlite {

  constructor() {
    this.db = ConexionSqlite.conexion
  }

  agregar = async (categoria) => {
    try {
      const { email, nombre, presupuesto } = categoria;
      
      const existeCategoria = await this.verificarExistenciaCategoria(email, nombre);
      if (existeCategoria) {
        throw new Error("Ya existe la categoría");
      }
      
      const sql = `INSERT INTO categorias (email, nombre, presupuesto) VALUES (?, ?, ?)`;
      await ConexionSqlite.runQuery(sql, [email, nombre, presupuesto]);
      return "Categoria registrada correctamente";
    } catch (error) {
      throw new Error("Error al agregar categoria: " + error);
    }
  };
  
  verificarExistenciaCategoria = async (email, nombre) => {
    const sql = `SELECT COUNT(*) AS count FROM categorias WHERE email = ? AND nombre = ?`;
    const result = await ConexionSqlite.getRow(sql, [email, nombre]);
    return result && result.count > 0;
  };


  
  devolverId = async (nombre,email) => {
    const sql = 'SELECT id FROM categorias WHERE nombre = ? AND email = ?';
    const result = await ConexionSqlite.getRow(sql, [nombre, email]);
  
    if (result) {
      return result.id; 
    } else {
      throw new Error("Error al obtener la categoria: ");
    }
  };
  
  
  editar = async (categoria) => {
    try {
      const {id,email, nombre, presupuesto} = categoria
      const sql = `UPDATE categorias SET email = ?, nombre = ?, presupuesto = ? WHERE id = ?`;
      await ConexionSqlite.runQuery(sql, [email, nombre, presupuesto, id])
      return "Categoria editada correctamente"
    }
    catch (error) {
      console.log(error)
      throw new Error("Error al editar categoria: " + error.message)
    }

  };
  
  eliminar = async categoria => {
    try {
      const {id} = categoria
      const sql = `DELETE FROM categorias WHERE id = ?`
      await ConexionSqlite.runQuery(sql, [id])
      return "Categoria eliminada correctamente"
    }
    catch (error) {
      console.log(error)
      throw new Error("Error al eliminar categoria: " + error.message)
    }

  };
  
  listar = async email => {

    try {
      const sql = `SELECT * FROM categorias WHERE email = ?`
      const row = await ConexionSqlite.getAllRows(sql, [email])
      return row 
    }
    catch (error) {
      console.log(error);
      throw new Error("Error al listar categorias: " + error.message);
    }

  };

}

export default CategoriaSqlite