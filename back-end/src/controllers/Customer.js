const services = require('../services');

const readProducts = async (_req, res) => {
  const products = await services.readProducts();
  return res.status(200).json(products);
};

module.exports = {
  readProducts,
};
