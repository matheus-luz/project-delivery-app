const Sequelize = require('sequelize');
const { Product, Sale, SaleProduct } = require('../database/models');
const CustomError = require('../utils/customError');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const createSale = async (body, user) => {
  const { sellerId, totalPrice, deliveryAddress, deliveryNumber, productIds, quantity } = body;
  const { userId } = user;

  const { count } = await Product.findAndCountAll({ where: { id: productIds } });

  if (productIds.length !== count) {
    throw new CustomError(404, '"productIds" not found');
  }

  await sequelize.transaction(async (t) => {
    const sale = await Sale.create({
      userId, sellerId, totalPrice, deliveryAddress, deliveryNumber,
    }, { transaction: t });

    const saleProduct = productIds.map((productId, index) => (
      { saleId: sale.id, productId, quantity: quantity[index] }
    ));

    await SaleProduct.bulkCreate(saleProduct, { transaction: t });
  });
};

const readProducts = async () => {
  const products = await Product.findAll();
  return products;
};

module.exports = {
  readProducts,
  createSale,
};
