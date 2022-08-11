const { Sale } = require('../database/models');

const update = async (id, status) => {
  await Sale.update({ status }, { where: { id } });

  return { statusCode: 200, data: { message: 'Updated' } };
};

module.exports = {
  update,
};
