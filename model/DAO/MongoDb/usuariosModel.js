import ConexionMongo from './conexionMongoDb.js';

class UsuarioMongoDb {
    constructor() {
        this.usuariosCollection = null;
        this.init();
    }

    async init() {
        try {
            this.usuariosCollection =  ConexionMongo.usuariosColeccion()
        } catch (error) {
            console.error(error);
        }
    }

    async registro(email, celular, nombre, pass, apellido, fechaNac, dni) {
        try {
            const existingUser = await this.usuariosCollection.findOne({ email: email });
            if (existingUser) {
                throw new Error(`Error, el correo ${email} ya fue ingresado`);
            }

            if (!email || !nombre || !pass) {
                throw new Error('El email, nombre y pass son campos requeridos');
            }
            const newUser = {
                email: email,
                celular: celular,
                nombre: nombre,
                apellido: apellido,
                fechaNac: fechaNac,
                dni: dni,
                pass: pass,
                registro: false,

            };
            await this.usuariosCollection.insertOne(newUser);

            return "Usuario registrado correctamente";
        } catch (error) {
            throw new Error("Error al registrar usuario: " + error);
        }
    }


    async login(email) {
        try {

            const user = await this.usuariosCollection.findOne({ email: email });
            if (!user) {
                throw new Error(`El ${email} no está registrado`);
            }

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }


    async confirmarRegistro(email) {
        try {
            const updateFilter = { email: email };
            const updateData = { $set: { registro: 1 } };

            await this.usuariosCollection.updateOne(updateFilter, updateData);

            const usuario = await this.usuariosCollection.findOne({ email: email });

            return usuario;
        } catch (error) {
            console.log(error);
            throw new Error("Error en la confirmación");
        }
    };

    async chequearConfirmacion(email) {
        try {
            const usuario = await  this.usuariosCollection.findOne({ email: email });

            if (!usuario) {
                throw new Error("El " + email + " no está registrado");
            }

            return usuario.registro !== 1;
        } catch (error) {
            throw new Error(error.message);
        }
    };





    async editarUsuario(email, celular, nombre, apellido) {
        try {
            console.log(email + nombre + apellido + celular);

            await this.usuariosCollection.updateOne({ email }, { $set: { nombre,apellido,celular } });


            const user = await this.usuariosCollection.findOne({ email });

            return user;
        } catch (error) {
            console.log(error);
            throw new Error("Error al editar al usuario: " + error.message);
        }
    }


    async cambiarContrasenia(email, nuevaPass) {
        try {

            const existingUser = await this.usuariosCollection.findOne({ email: email });
            if (!existingUser) {
                throw new Error("El correo " + email + " no está registrado");
            }


            await this.usuariosCollection.updateOne({ email: email }, { $set: { pass: nuevaPass } });

            return;
        } catch (error) {
            throw new Error(error);
        }
    }


    async eliminarCuenta(email) {
        try {
            const usuario = await this.usuariosCollection.findOne({ email });

            if (usuario) {
                await this.usuariosCollection.deleteOne({ email });
                console.log(`La cuenta con el email ${email} ha sido borrada correctamente`);
            } else {
                throw new Error("Usuario no encontrado");
            }
        } catch (error) {
            throw new Error(error);
        }
    };

  



      

}


export default UsuarioMongoDb;

