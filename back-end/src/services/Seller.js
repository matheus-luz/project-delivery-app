const { User, Sale, Product } = require('../database/models');
const SellerError = require('../utils/sellerError');

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

  const data = formatOrders(orders);

  return { status: 200, data };
};

const getById = async (id) => {
  const orderById = await Sale.findByPk(id, {
    include: [{ model: User, as: 'seller', attributes: ['name'] },
    { model: Product, as: 'products', through: { attributes: ['quantity'], as: 'salesProducts' } },
    ],
    attributes: { 
      exclude: ['userId', 'sellerId', 'totalPrice', 'deliveryAddress', 'deliveryNumber'] },
  });

  if (!orderById) throw new SellerError(404, 'Order by id doesn\'t exists');

  return { status: 200, data: orderById };
};

const update = async (id, statusNew) => {
  await Sale.update({ status: statusNew }, { where: id });

  return { status: 200, data: { message: 'Update' } };
};

module.exports = {
  getInfo,
  getById,
  update,
};