const { Product, Sale, User } = require('../database/models');
const CustomError = require('../utils/customError');

const readProducts = async () => {
  const products = await Product.findAll();
  return products;
};

const readOne = async (id) => {
  const order = await Sale.findByPk(id, {
    include: [{ model: User, as: 'userSeller', attributes: ['name'] },
    { model: Product,
      as: 'products',
      through: { attributes: ['quantity'], as: 'salesProducts' } }],
  });

  if (!order) throw new CustomError(404, 'Order doesn\'t exists');

  return order;
};

module.exports = { readProducts, readOne };
