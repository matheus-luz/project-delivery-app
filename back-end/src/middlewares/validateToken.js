const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = async (req, res, next) => {
  try {
    const JWT_SECRET = fs.readFileSync('./jwt.evaluation.key', { encoding: 'utf8' });

    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: 'Token not found' });
  
    const decoded = jwt.verify(token, JWT_SECRET);

    req.tokenData = decoded.data;

    next();
  } catch (error) {
    if (error.name.includes('Token')) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }

    next(error);
  }
};
