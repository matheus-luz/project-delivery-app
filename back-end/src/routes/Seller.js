const router = require('express').Router();
const rescue = require('express-rescue');
const SellerController = require('../controllers/Seller');
const OrderController = require('../controllers/Order');
const authToken = require('../middlewares/authToken');
const validateStatusUpdate = require('../middlewares/validateStatusUpdate');

router.get('/orders', authToken, rescue(OrderController.readOrders));
router.get('/orders/:id', authToken, rescue(OrderController.readOrderbyId));
router
  .patch('/orders/update/:id', authToken, validateStatusUpdate, rescue(SellerController.update));

module.exports = router;
