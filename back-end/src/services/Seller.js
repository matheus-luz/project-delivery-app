const { User, Sale, Product } = require('../database/models');

const formatResponse = (orders) => orders.map((order) => ({
  user: order.user,
  seller: order.seller,
  request: {
    address: order.deliveryAddress,
    adressNumber: order.deliveryNumber,
    data: order.saleDate,
    totalPrice: order.totalPrice,
    status: order.status,
  },
}));

const getInfo = async () => {
  const orders = await Sale
  .findAll(
    { include: 
      [
        { model: User, as: 'user', attributes: { exclude: ['id', 'password'] } }, 
        { model: User, as: 'seller', attributes: { exclude: ['id', 'password'] } },
      ],
      attributes: { exclude: ['userId', 'sellerId'] },
    },
);

    const data = formatResponse(orders);

  return { status: 200, data };
};

const getById = async (id) => {
  const find = await Sale.findByPk(id, {
    include: [{ model: User, as: 'seller', attributes: ['name'] },
    { model: Product, as: 'products', through: { attributes: ['quantity'], as: 'salesProducts' } },
    ],
    attributes: { 
      exclude: ['userId', 'sellerId', 'totalPrice', 'deliveryAddress', 'deliveryNumber'] },
  });

  return { status: 200, data: find };
};

module.exports = {
  getInfo,
  getById,
};