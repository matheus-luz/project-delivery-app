const { Product, Sale, User } = require('../database/models');
const CustomError = require('../utils/customError');

const formatOrders = (orders) => orders.map((order) => ({
  user: order.user,
  seller: order.seller,
  order: {
    address: order.deliveryAddress,
    adressNumber: order.deliveryNumber,
    saleDate: order.saleDate,
    totalPrice: order.totalPrice,
    status: order.status,
  },
}));

const readOrders = async (user) => {
  const orders = await Sale
  .findAll(
    { include: 
      [
        { model: User, as: 'user', attributes: { exclude: ['password'] } }, 
        { model: User, as: 'seller', attributes: { exclude: ['password'] } },
      ],
      attributes: { exclude: ['userId', 'sellerId'] },
    },
  );
  
  const formatedOrders = formatOrders(orders);

  if (user.role === 'customer') {
    return formatedOrders.filter((e) => e.user.id === user.userId);
  }

  return formatedOrders.filter((e) => e.seller.id === user.userId);
};

const readOrderbyId = async (id) => {
  const order = await Sale.findByPk(id, {
    attributes: { exclude: ['userId', 'sellerId', 'deliveryAddress', 'deliveryNumber'] },
    include: [{ model: User, as: 'seller', attributes: ['name'] },
    { model: Product, as: 'products', through: { attributes: ['quantity'], as: 'salesProducts' } },
    ],
  });

  if (!order) throw new CustomError(404, 'Order doesn\'t exists');

  return order;
};

module.exports = {
  readOrders,
  readOrderbyId,
};
