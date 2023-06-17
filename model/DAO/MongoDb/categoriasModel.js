import ConexionMongo from './conexionMongoDb.js'
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

class CategoriasMongoDb {

    constructor() {
        this.categoriasCollection = null;
        this.init();
    }

    async init() {
        try {
            this.categoriasCollection =  ConexionMongo.categoriasColeccion()
        } catch (error) {
            console.error(error);
        }
    }

    agregar = async (categoria) => {
        try {
            const { email, nombre, presupuesto } = categoria;

            const existeCategoria = await this.verificarExistenciaCategoria(email, nombre);
            if (existeCategoria) {
                throw new Error("Ya existe la categoría");
            }

            const nuevaCategoria = {
                email: email,
                nombre: nombre,
                presupuesto: presupuesto,
                id: new mongoose.Types.ObjectId() 
            };

            await this.categoriasCollection.insertOne(nuevaCategoria);

            return "Categoria registrada correctamente";
        } catch (error) {
            throw new Error("Error al agregar categoria: " + error);
        }
    };


    verificarExistenciaCategoria = async (email, nombre) => {
        const categoriaExistente = await this.categoriasCollection.findOne({ email, nombre });
        return !!categoriaExistente;
    };


    devolverId = async (nombre, email) => {
        try {
            const categoria = await this.categoriasCollection.findOne({ nombre, email });

            if (categoria) {
                return categoria.id;
            } else {
                throw new Error("Error al obtener la categoría");
            }
        } catch (error) {
            throw new Error("Error al obtener la categoría: " + error.message);
        }
    };




    listar = async (email) => {
        try {
            const categorias = await this.categoriasCollection.find({ email }).toArray();
            return categorias;
        } catch (error) {
            console.log(error);
            throw new Error("Error al listar categorias: " + error.message);
        }
    };

    eliminar = async (categoria) => {
        try {

            const { _id } = categoria;
            const objectId = new ObjectId(_id);

            await this.categoriasCollection.deleteOne({ _id: objectId });

            return "Categoria eliminada correctamente";
        } catch (error) {
            console.log(error);
            throw new Error("Error al eliminar categoria: " + error.message);
        }
    };

    editar = async (categoria) => {
        try {
            const { _id, email, nombre, presupuesto } = categoria;
            const objectId = new ObjectId(_id);

            await this.categoriasCollection.updateOne({ _id: objectId }, {
                $set: {
                    email: email,
                    nombre: nombre,
                    presupuesto: presupuesto,
                }
            });

            return "categoria editada correctamente";
        } catch (error) {
            console.log(error);
            throw new Error("Error al editar la categoria: " + error.message);
        }
    };



}


export default CategoriasMongoDb