const CustomError = require('../utils/customError');

module.exports = (req, _res, next) => {
  const { role } = req.user;

  if (role !== 'administrator') throw new CustomError(401, 'Administrator required');

  return next();
};
