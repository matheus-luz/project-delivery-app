const md5 = require('md5');
const { User } = require('../database/models');
const CustomError = require('../utils/customError');

const validateEmail = async (email) => {
  const getUserByEmail = await User.findOne({ where: { email } });
  if (getUserByEmail) throw new CustomError(409, 'Email already registered');
};

const validateName = async (name) => {
  const getUserByName = await User.findOne({ where: { name } });
  if (getUserByName) throw new CustomError(409, 'Name already registered');
};

const register = async (body) => {
  const { name, email, password } = body;
  await validateEmail(email);
  await validateName(name);

  const user = await User.create({ ...body, password: md5(password) });

  return user;
};

module.exports = { validateEmail, validateName, register };
