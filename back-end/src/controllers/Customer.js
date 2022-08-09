const services = require('../services');

const createSale = async (req, res) => {
  const { body } = req;
  const { tokenData } = req;

  await services.createSale(body, tokenData);

  return res.status(201).json({ message: 'sale successfully created' });
};

const readProducts = async (req, res) => {
  const products = await services.readProducts();
  return res.status(200).json(products);
};

module.exports = {
  createSale,
  readProducts,
};
