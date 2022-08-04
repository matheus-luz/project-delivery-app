const LoginService = require('../services/Login');

module.exports = async (req, res) => {
  const user = await LoginService(req.body.email);
  
  // if (!user) throw errorFunction(BAD_REQUEST, 'Invalid fields');

  return res.status(200).json(user);
};