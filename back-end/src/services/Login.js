const md5 = require('md5');
const { User } = require('../database/models');
const customError = require('../utils/customError');

module.exports = async (body) => {
  const { email, password } = body;
  const user = await User.findOne({ where: { email } });
  // console.log(md5(password));

  if (!user) throw new customError(404, 'Not found');

  if (md5(password) !== user.password) throw new customError(401, 'Unauthorized');

  return user;
};
