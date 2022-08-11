const service = require('../services/Seller');
const CustomError = require('../utils/customError');

const update = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) throw new CustomError(400, 'Status does not exist');

  const { statusCode, data } = await service.update(id, status);

  return res.status(statusCode).json(data);
};

module.exports = {
  update,
};
