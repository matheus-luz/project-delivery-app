const LoginService = require('../services/Login');
const rescue = require('express-rescue')

module.exports = rescue(async (req, res) => {
  const { body } = req;
    const user = await LoginService(body);
  
    // if (!user) throw errorFunction(BAD_REQUEST, 'Invalid fields');
  
    return res.status(200).json(user);
});
