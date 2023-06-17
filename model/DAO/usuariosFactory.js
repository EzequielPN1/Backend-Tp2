import ModelSqlite from "./Sqlite/usuariosSqlite.js"
import ModelMongodb from "./MongoDb/usuariosModel.js"

class ModelFactory {
    static get(tipo) {

        switch (tipo) {
            case 'SQLite':
                console.log('**** Persistiendo en Sqlite ****')
                return new ModelSqlite()
                
            case 'mongoDb':
                console.log('**** Persistiendo en MongoDb ****')
                return new ModelMongodb()

            default:  
            console.log('**** Persistiendo en Sqlite(default) ****')            
                return new ModelSqlite()
        }
    }
}

export default ModelFactory