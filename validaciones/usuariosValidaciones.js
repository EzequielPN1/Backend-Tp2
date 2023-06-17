import Joi from "joi";

const usuarioSchema = Joi.object({
  email: Joi.string().email().required(),
  celular: Joi.string().min(8).required(),
  nombre: Joi.string().required(),
  pass: Joi.string().alphanum().required(),
  apellido: Joi.string().required(),
  fechaNacimiento:  Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
  dni: Joi.string().length(8).required(),
  token: Joi.string().allow(''),
});

const validar = usuario => {
  const { error } = usuarioSchema.validate(usuario);
  if (error) {
    return { result: false, error };
  }
  return { result: true };
}

const validarEdicion = (celular, nombre, apellido) => {
  const usuarioSchemaEdicion = Joi.object({
    celular: Joi.string().min(8).required(),
    nombre: Joi.string().required(),
    apellido: Joi.string().required(),
  });

  const { error } = usuarioSchemaEdicion.validate({ celular, nombre, apellido });
  if (error) {
    return { result: false, error };
  }
  return { result: true };
}

export default {
  validar,
  validarEdicion
};
