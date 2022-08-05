module.exports = (error, _req, res, _next) => {
  // if (error.status) return res.status(error.status).json({ message: error.message });
  console.log(error.message);
  return res.status(500).json({ message: 'Somenthing went wrong here, please try again later' });
};
