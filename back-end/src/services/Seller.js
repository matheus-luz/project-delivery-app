const { User, Sale } = require('../database/models');

const formatResponse = (orders) => orders.map((order) => ({
  user: order.user,
  seller: order.seller,
  pedido: {
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
      attributes: { exclude: ['id', 'userId', 'sellerId'] },
    },
);

    const data = formatResponse(orders);

  return { status: 200, data };
};

module.exports = {
  getInfo,
};