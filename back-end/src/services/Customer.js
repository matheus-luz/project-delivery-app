const Sequelize = require('sequelize');
const { Product, Sale, SaleProduct, User } = require('../database/models');
const CustomError = require('../utils/customError');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const createSale = async (body, user) => {
  const { sellerId, totalPrice, deliveryAddress, deliveryNumber, products } = body;
  const productsIds = products.map(({ productId }) => productId);
  const { userId } = user;

  const { count } = await Product.findAndCountAll({ where: { id: productsIds } });

  if (products.length !== count) {
    throw new CustomError(404, '"productIds" not found');
  }

  await sequelize.transaction(async (t) => {
    const sale = await Sale.create({
      userId, sellerId, totalPrice, deliveryAddress, deliveryNumber,
    }, { transaction: t });

    const saleProduct = products.map(({ productId, quantity }) => (
      { saleId: sale.id, productId, quantity }
    ));

    await SaleProduct.bulkCreate(saleProduct, { transaction: t });
  });
};

const readProducts = async () => {
  const products = await Product.findAll();
  return products;
};

const readOne = async (id) => {
  const order = await Sale.findByPk(id, {
    include: [{ model: User, as: 'seller', attributes: ['name'] },
    { model: Product,
      as: 'products',
      through: { attributes: ['quantity'], as: 'salesProducts' } }],
  });

  if (!order) throw new CustomError(404, 'Order doesn\'t exists');

  return order;
};

const updateSaleStatus = async (id) => {
  await Sale.update({ status: 'Entregue' }, { where: { id } });
};

module.exports = {
  readProducts,
  createSale,
  updateSaleStatus,
  readOne,
};
