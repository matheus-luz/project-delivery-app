const { User } = require('../database/models');

module.exports = async (email) => {
  const user = await User.findOne({ where: { email } });
  
  // if (!user) throw errorFunction(BAD_REQUEST, 'Invalid fields');

  return user;
};