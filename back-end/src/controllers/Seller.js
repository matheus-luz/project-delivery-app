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

module.exports = {
  getOrders,
  findById,
};