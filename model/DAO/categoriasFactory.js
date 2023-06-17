import ModelSqlite from "./Sqlite/categoriasSqlite.js"
import ModelMongodb from "./MongoDb/categoriasModel.js"

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