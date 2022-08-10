const Joi = require('joi');
const CustomError = require('../utils/customError');

const productsArray = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().required(),
});

const schema = Joi.object({
  sellerId: Joi.number().required(),
  totalPrice: Joi.number().required(),
  deliveryAddress: Joi.string().required(),
  deliveryNumber: Joi.string().required(),
  products: Joi.array().items(productsArray).required(),
});

module.exports = (req, _res, next) => {
  const { error } = schema.validate(req.body);

  if (error) throw new CustomError(400, error.message);

  return next();
};