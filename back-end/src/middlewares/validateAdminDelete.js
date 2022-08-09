const Joi = require('joi');
const CustomError = require('../utils/customError');

const schema = Joi.object({
  id: Joi.number().required(),
});

module.exports = (req, _res, next) => {
  const { error } = schema.validate(req.body);

  if (error) throw new CustomError(400, error.message);

  return next();
};