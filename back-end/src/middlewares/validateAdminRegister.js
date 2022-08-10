const Joi = require('joi');
const CustomError = require('../utils/customError');

const schema = Joi.object({
  name: Joi.string().min(12).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('administrator', 'seller', 'customer').required(),
});

module.exports = (req, _res, next) => {
  const { error } = schema.validate(req.body);

  if (error) throw new CustomError(400, error.message);

  return next();
};