const md5 = require('md5');
const { User } = require('../database/models');
const CustomError = require('../utils/customError');

module.exports = async (body) => {
  const { email, password } = body;
  const user = await User.findOne({ where: { email } });

  if (!user) throw new CustomError(404, 'Email is not registered');

  if (md5(password) !== user.password) throw new CustomError(401, 'Incorrect password');

  return user;
};
