const OrderService = require('../services/Order');

const readOrders = async (req, res) => {
  const { user } = req;
  const formatedOrders = await OrderService.readOrders(user);

  return res.status(200).json(formatedOrders);
};

const readOrderbyId = async (req, res) => {
  const { id } = req.params;
  const order = await OrderService.readOrderbyId(id);
  return res.status(200).json(order);
};

module.exports = {
  readOrders,
  readOrderbyId,
};
