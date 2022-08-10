const service = require('../services/Seller');

const getOrders = async (req, res) => {
  const { status, data } = await service.getInfo();

  return res.status(status).json(data);
};

const findById = async (req, res) => {
  const { id } = req.params;

  const { status, data } = await service.getById(id);

  return res.status(status).json(data);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { statusNew } = req.body;

  const { status, data } = await service.update(id, statusNew);

  return res.status(status).json(data);
};

module.exports = {
  getOrders,
  findById,
  update,
};