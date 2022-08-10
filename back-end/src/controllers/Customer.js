const services = require('../services');

const createSale = async (req, res) => {
  const { body } = req;
  const { user } = req;

  await services.createSale(body, user);

  return res.status(201).json({ message: 'Sale successfully created' });
};

const readProducts = async (_req, res) => {
  const products = await services.readProducts();
  return res.status(200).json(products);
};

const updateSaleStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  await services.updateSaleStatus(id, status);

  return res.status(200).json({ message: 'Updated' });
};

module.exports = {
  createSale,
  readProducts,
  updateSaleStatus,
};
