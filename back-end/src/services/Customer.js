const { Product } = require('../database/models');

const readProducts = async () => {
  const products = await Product.findAll();
  return products;
};

module.exports = {
  readProducts,
  createSale,
};
