const router = require('express').Router();
const rescue = require('express-rescue');
const OrderController = require('../controllers/Order');
const authToken = require('../middlewares/authToken');

router.get('/', authToken, rescue(OrderController.readOrders));
router.get('/:id', authToken, rescue(OrderController.readOrderbyId));

module.exports = router;