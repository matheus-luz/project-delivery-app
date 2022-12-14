const RegisterService = require('../services/Register');
const generateToken = require('../utils/generateToken');

module.exports = async (req, res) => {
  const { body } = req;
  const user = await RegisterService.register(body);

  const token = generateToken(user.id, user.role);

  return res.status(201).json({
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  });
};
