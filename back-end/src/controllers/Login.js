const LoginService = require('../services/Login');

module.exports = async (req, res) => {
  const { body } = req;
  const user = await LoginService(body);

  return res.status(200).json(user);
};
