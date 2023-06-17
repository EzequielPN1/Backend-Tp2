import ConexionSqlite from './conexionSqlite.js'

class UsuarioSqlite {

  constructor() {
    this.bd = ConexionSqlite.conexion
  }

  registro = async (email, celular, nombre, pass, apellido, fechaNac, dni) => {
    try {
      const insertSql = `INSERT INTO usuarios (email,celular, nombre, pass,apellido,fechaNac,dni) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      await ConexionSqlite.runQuery(insertSql, [email, celular, nombre, pass, apellido, fechaNac, dni]);
      return "Usuario registrado correctamente";
    } catch (error) {
      if (error.includes("UNIQUE constraint failed: usuarios.email")) {
        throw new Error("Error, el correo " + email + " ya fue ingresado");
      } else {
        throw new Error("Error al registrar usuario: " + error);
      }
    }
  };

  login = async (email) => {
    try {
      const selectSql = `SELECT * FROM usuarios WHERE email = ?`;
      const row = await ConexionSqlite.getRow(selectSql, [email]);

      if (!row) {
        throw new Error("El " + email + " no está registrado");
      }

      return row;
    } catch (error) {
      throw new Error(error.message);
    }
  };


  editarUsuario = async (email, celular, nombre, apellido) => {
    try {
      const updateSql = `UPDATE usuarios SET celular = ?,nombre  = ?, apellido = ? WHERE email = ?`;
      await ConexionSqlite.runQuery(updateSql, [celular,nombre,apellido,email]);

      const selectSql = `SELECT * FROM usuarios WHERE email = ?`;
      const row = await ConexionSqlite.getRow(selectSql, [email]);
      return row;

    } catch (error) {
      console.log(error);
      throw new Error("Error al editar al usuario: " + error.message);
    }
  };


  confirmarRegistro = async (email) => {
    try {
      const updateSql = `UPDATE usuarios SET registro = 1 WHERE email = ?`;
      await ConexionSqlite.runQuery(updateSql, [email]);

      const selectSql = `SELECT * FROM usuarios WHERE email = ?`;
      const usuario = await ConexionSqlite.getRow(selectSql, [email]);

      return usuario;
    } catch (error) {
      console.log(error);
      throw new Error("Error en la confirmación");
    }
  };

  chequearConfirmacion = async (email) => {
    try {
      const selectSql = `SELECT * FROM usuarios WHERE email = ?`;
      const row = await ConexionSqlite.getRow(selectSql, [email]);

      if (!row) {
        throw new Error("El " + email + " no está registrado");
      }

      return row.registro != 1;
    } catch (error) {
      throw new Error(error.message);
    }
  }


  cambiarContrasenia = async (email, nuevaPass) => {
    try {
      const checkEmailSQL = 'SELECT COUNT(*) as count FROM usuarios WHERE email = ?';
      const emailCount = await ConexionSqlite.getRow(checkEmailSQL, [email]);

      if (emailCount.count != 0) {
        const updatePasswordSQL = 'UPDATE usuarios SET pass = ? WHERE email = ?';
        await ConexionSqlite.runQuery(updatePasswordSQL, [nuevaPass, email]);
      }
      return;
    } catch (error) {
      throw new Error(error);
    }
  };

  eliminarCuenta = async (email) => {
    try {
      const checkEmailSQL = 'SELECT COUNT(*) as count FROM usuarios WHERE email = ?';
      const emailCount = await ConexionSqlite.getRow(checkEmailSQL, [email]);

      if (emailCount.count != 0) {
        const deleteCount = 'DELETE FROM usuarios WHERE email = ?';
        await ConexionSqlite.runQuery(deleteCount, [email]);
        console.log("La cuenta con el " + email + " ha sido borrada correctamente");
      }
      return;
    } catch (error) {
      throw new Error(error);
    }
  };





}

export default UsuarioSqlite