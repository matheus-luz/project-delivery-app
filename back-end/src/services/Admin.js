const { Op } = require('sequelize');
const { User } = require('../database/models');
const { validateEmail, validateName } = require('./Register');

const getAll = async () => {
  const users = await User.findAll({ where: { role: { [Op.ne]: 'administrator' } } });
  return users;
};

const create = async (body) => {
  const { name, email } = body;
  await validateEmail(email);
  await validateName(name);

  const user = await User.create({ ...body });

  return user;
};

const remove = async (id) => User.destroy({ where: { id } });

module.exports = { getAll, create, remove };
