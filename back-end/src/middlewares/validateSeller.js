const Joi = require('joi');
const SellerError = require('../utils/sellerError');

const schema = Joi.object({
  status: Joi.string().min(10).required(),
});

module.exports = (req, _res, next) => {
  const { error } = schema.validate(req.body);

  if (error) throw new SellerError(400, error.message);

  return next();
};
