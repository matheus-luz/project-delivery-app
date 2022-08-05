const md5 = require('md5');
const { User } = require('../database/models');

module.exports = async (body) => {
  const { email, password } = body;
  const user = await User.findOne({ where: { email } });
  console.log(password);
  console.log(md5(password));

  // if (!user) throw errorFunction(BAD_REQUEST, 'Invalid fields');

  return user;
};
