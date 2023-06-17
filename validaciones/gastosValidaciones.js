import Joi from "joi";

const validar = gasto => {
  const gastoSchema = Joi.object({
    email: Joi.string().email().required(),
    titulo: Joi.string().required(),
    monto: Joi.number().positive().required(),
    fecha: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
    descripcion: Joi.string().allow(''),
  }).unknown(false).keys({
    idCategoria: Joi.any(),
  });

  const { error } = gastoSchema.validate(gasto);
  if (error) {
    return { result: false, error };
  }
  return { result: true };
}

const validarGastoEditado = (titulo, monto, fecha,descripcion) => {
  const usuarioSchemaEdicion = Joi.object({
    titulo: Joi.string().required(),
    monto: Joi.number().positive().required(),
    fecha: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
    descripcion: Joi.string().allow(''),
  });

  const { error } = usuarioSchemaEdicion.validate({ titulo, monto, fecha,descripcion });
  if (error) {
    return { result: false, error };
  }
  return { result: true };
}

export default {
  validar,
  validarGastoEditado
};
