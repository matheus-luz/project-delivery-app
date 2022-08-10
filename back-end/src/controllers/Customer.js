const CustomerService = require('../services/Customer');

const readProducts = async (_req, res) => {
  const products = await CustomerService.readProducts();
  return res.status(200).json(products);
};

const readOne = async (req, res) => {
  const { id } = req.params;
  const order = await CustomerService.readOne(id);
  return res.status(200).json(order);
};

module.exports = { readProducts, readOne };
