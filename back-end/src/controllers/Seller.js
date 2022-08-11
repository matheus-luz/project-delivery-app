const service = require('../services/Seller');

const update = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const { statusCode, data } = await service.update(id, status);

  return res.status(statusCode).json(data);
};

module.exports = {
  update,
};
