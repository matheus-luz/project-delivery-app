const fs = require('fs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = fs.readFileSync('./jwt.evaluation.key', { encoding: 'utf8' });

module.exports = (userId, email) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  
  const token = jwt.sign({ data: { userId, email } }, JWT_SECRET, jwtConfig);

  return token;
};