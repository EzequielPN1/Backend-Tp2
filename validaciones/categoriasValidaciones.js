import Joi from "joi";

const validar = categoria => {
  const categoriaSchema = Joi.object({
    id: Joi.string().allow(''),
    email: Joi.string().email().required(),
    nombre: Joi.string().required(),
    presupuesto: Joi.number().positive().required()
  });

  const { error } = categoriaSchema.validate(categoria);
  if (error) {
    return { result: false, error };
  }
  return { result: true };
};

const validarEdicionCategoria = (email,nombre,presupuesto) => {
  const categoriaSchema = Joi.object({
    email: Joi.string().email().required(),
    nombre: Joi.string().required(),
    presupuesto: Joi.number().positive().required()
  });

  const { error } = categoriaSchema.validate({email,nombre,presupuesto});
  if (error) {
    return { result: false, error };
  }
  return { result: true };
};

export default { 
    validar, 
    validarEdicionCategoria
 };
