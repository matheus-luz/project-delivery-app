const service = require('../services/Seller');

const getOrders = async (req, res) => {
  const { status, data } = await service.getInfo();

  return res.status(status).json(data);
};

module.exports = {
  getOrders,
};