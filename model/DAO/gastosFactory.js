import ModelSqlite from "./Sqlite/gastosSqlite.js"
import ModelMongodb from "./MongoDb/gastosModel.js"

class ModelFactory {
    static get(tipo) {

        switch (tipo) {
            case 'SQLite':
                return new ModelSqlite()
                
            case 'mongoDb':
                return new ModelMongodb()

            default:
                return new ModelSqlite()
        }
    }
}

export default ModelFactory