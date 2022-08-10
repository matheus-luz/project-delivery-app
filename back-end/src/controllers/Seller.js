const service = require('../services/Seller');
const SallerError = require('../utils/sellerError');

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
  const { status } = req.body;

  if (!status) throw new SallerError(400, 'Status does not exist');

  const { statusCode, data } = await service.update(id, status);

  return res.status(statusCode).json(data);
};

module.exports = {
  getOrders,
  findById,
  update,
};