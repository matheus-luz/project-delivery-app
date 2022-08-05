const LoginService = require('../services/Login');
const generateToken = require('../utils/generateToken');

module.exports = async (req, res) => {
  const { body } = req;
  const user = await LoginService(body);

  const token = generateToken(user.id, user.email);

  return res.status(200).json({ 
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  });
};
