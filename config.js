import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 3001
const STRING_DE_CONECCION_MONGODB = process.env.MONGODB_ATLAS_REMOTA || 'mongodb://127.0.0.1:27017'
const MODO_PERSISTENCIA = process.env.MONGO_DB || 'mongoDb'
const WHATSAPP = false

export default {
    PORT,
    MODO_PERSISTENCIA,
    STRING_DE_CONECCION_MONGODB,
    WHATSAPP
}