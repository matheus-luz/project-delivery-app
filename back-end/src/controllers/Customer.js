const CustomerService = require('../services/Customer');

const createSale = async (req, res) => {
  const { body } = req;
  const { user } = req;

  const id = await CustomerService.createSale(body, user);

  return res.status(201).json({ id });
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

const getAllSellers = async (_req, res) => {
  const users = await CustomerService.getAllSellers();

  return res.status(200).json(users);
};

module.exports = {
  createSale,
  readProducts,
  updateSaleStatus,
  getAllSellers,
};
