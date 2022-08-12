const CustomerService = require('../services/Customer');

const createSale = async (req, res) => {
  const { body } = req;
  const { user } = req;

  await CustomerService.createSale(body, user);

  return res.status(201).json({ message: 'Sale successfully created' });
};

const readProducts = async (_req, res) => {
  const products = await CustomerService.readProducts();
  return res.status(200).json(products);
};

const updateSaleStatus = async (req, res) => {
  const { id } = req.params;

  await CustomerService.updateSaleStatus(id);

  return res.status(200).json({ message: 'Updated' });
};

module.exports = {
  createSale,
  readProducts,
  updateSaleStatus,
};
