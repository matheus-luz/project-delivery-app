const router = require('express').Router();
const rescue = require('express-rescue');
const SellerController = require('../controllers/Seller');
const authToken = require('../middlewares/authToken');
const validateStatusUpdate = require('../middlewares/validateStatusUpdate');

router
  .patch('/orders/update/:id', authToken, validateStatusUpdate, rescue(SellerController.update));

module.exports = router;
