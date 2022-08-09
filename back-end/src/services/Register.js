const md5 = require('md5');
const { User } = require('../database/models');
const CustomError = require('../utils/customError');

module.exports = async (body) => {
  const { name, email, password } = body;
  const getUserByEmail = await User.findOne({ where: { email } });
  if (getUserByEmail) throw new CustomError(409, 'Email already registered');

  const getUserByName = await User.findOne({ where: { name } });
  if (getUserByName) throw new CustomError(409, 'Name already registered');

  const user = await User.create({ ...body, password: md5(password) });

  return user;
};
