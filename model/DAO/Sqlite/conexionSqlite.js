import sqlite3 from "sqlite3";

class ConexionSqlite {
  static conexion = null;

  static conectar = async () => {
    try {
      console.log('Conectando a la base de datos...');
      return new Promise((resolve, reject) => {
        this.conexion = new sqlite3.Database("./BD/BaseDatosCopy.db", (err) => {
          if (err) {
            console.error(err.message);
            reject(err);
          } else {
            console.log("Conexión exitosa a Sqlite");
            resolve();
          }
        });
      });
    } catch (error) {
      console.error("Error al conectar a la base de datos:", error);
      throw error;
    }
  };

  static desconectar = async () => {
    try {
      if (this.conexion) {
        this.conexion.close((err) => {
          if (err) {
            console.error(err.message);
            throw err;
          }
          console.log("Desconexión exitosa de la base de datos");
        });
      } else {
        console.warn("No hay una conexión activa");
      }
    } catch (error) {
      console.error("Error al desconectar de la base de datos:", error);
      throw error;
    }
  };

  static runQuery = (sql, params) => {
    return new Promise((resolve, reject) => {
      this.conexion.run(sql, params, (err) => {
        if (err) {
          console.log(err);
          reject(err.message);
        } else {
          resolve();
        }
      });
    });
  };

  static getRow = (sql, params) => {
    return new Promise((resolve, reject) => {
      this.conexion.get(sql, params, (err, row) => {
        if (err) {
          console.log(err);
          reject(err.message);
        } else {
          resolve(row);
        }
      });
    });
  };

  static getAllRows = (sql, params) => {
    return new Promise((resolve, reject) => {
      this.conexion.all(sql, params, (err, rows) => {
        if (err) {
          console.log(err);
          reject(err.message);
        } else {
          resolve(rows);
        }
      });
    });
  };
}

export default ConexionSqlite;

