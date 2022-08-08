const fs = require('fs');
const jwt = require('jsonwebtoken');
const CustomError = require('../utils/customError');

const JWT_SECRET = fs.readFileSync('./jwt.evaluation.key', { encoding: 'utf8' });

module.exports = async (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) throw new CustomError(401, 'Token not found');

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded.data;

    return next();
  } catch (err) {
    throw new CustomError(401, 'Expired or invalid token');
  }
};