import ModelFactory from "../model/DAO/usuariosFactory.js"
import bcrypt from 'bcrypt';
import config from "../config.js";
import CalculadorEdad from "../servicio/calculadorEdad.js"


class ServicioUsuario {

  constructor() {
    this.model = ModelFactory.get(config.MODO_PERSISTENCIA)
  }

  registro = async (usuario) => {
    try {
      const { email, celular, nombre, pass, apellido, fechaNacimiento, dni } = usuario
      let edad = CalculadorEdad.calcularEdad(fechaNacimiento)
      if (edad < 18) {
        throw new Error("Edad no valida para registrarse");
      }
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(pass, salt);
      const respuesta = await this.model.registro(email, celular, nombre, hash, apellido, fechaNacimiento, dni);
      return respuesta;
    } catch (error) {
      throw new Error(error);
    }
  };


  login = async (email, pass) => {
    try {
      const usuario = await this.model.login(email);
      const match = await bcrypt.compare(pass, usuario.pass);
      if (match) {
        if (usuario.registro == 0) {
          throw new Error("Cuenta no confirmada");
        } else {
          console.log("Inicio de sesión exitoso de " + email);
          return usuario;
        }
      } else {
        throw new Error("Contraseña incorrecta");
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  editarUsuario = async (email, celular, nombre, apellido) => {
    try {
      const usuario = await this.model.editarUsuario(email, celular, nombre, apellido)
      console.log(usuario);
      return usuario;
    } catch (error) {
      throw new Error(error);
    }
  };

  confirmarRegistro = async (email) => {
    try {
      const usuario = await this.model.confirmarRegistro(email)
      console.log('Registro del email ' + email + ' confirmado correctamente');
      return usuario;
    } catch (error) {
      throw new Error("Error al confirmar el registro");
    }
  }


  chequearConfirmacion = async (email) => {
    try {
      let confirmado = await this.model.chequearConfirmacion(email);
      return confirmado;
    } catch (error) {
      throw new Error("Error al chequear la Confirmacion");
    }
  }

  esValido = async (email) => {
    try {
      await this.model.login(email);
    } catch (error) {
      throw new Error(error);
    }

  }

  cambiarContrasenia = async (email, nuevaPass) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(nuevaPass, salt);
      await this.model.cambiarContrasenia(email, hash);
    } catch (error) {
      throw new Error(error);
    }
  };

  eliminarCuenta = async (pass, email) => {
    try {
      const usuario = await this.model.login(email);
      const match = await bcrypt.compare(pass, usuario.pass);
      if (match) {
        await this.model.eliminarCuenta(email);
      } else {
        throw new Error("Contraseña invalida");
      }
    } catch (error) {
      throw new Error(error);
    }
  };




  devolverUsuarioValidado = async (email) => {
    try {
      const usuario = await this.model.login(email);
      return usuario;
    } catch (error) {
      throw new Error(error);
    }
  }




}

export default ServicioUsuario