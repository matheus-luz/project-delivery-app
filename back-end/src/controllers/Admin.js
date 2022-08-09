const AdminService = require('../services/Admin');

const getAll = async (_req, res) => {
  const users = await AdminService.getAll();

  return res.status(200).json(users);
};

const create = async (req, res) => {
  const { body } = req;
  await AdminService.create(body);

  return res.status(201).end();
};

const remove = async (req, res) => {
  const { body: { id } } = req;
  await AdminService.remove(id);

  return res.status(204).end();
};

module.exports = { getAll, create, remove };
