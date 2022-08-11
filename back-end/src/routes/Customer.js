const router = require('express').Router();
const rescue = require('express-rescue');
const CustomerController = require('../controllers/Customer');
const OrderController = require('../controllers/Order');
const authToken = require('../middlewares/authToken');
const validateSale = require('../middlewares/validateSale');

router.get('/products', authToken, rescue(CustomerController.readProducts));
router.get('/orders', authToken, rescue(OrderController.readOrders));
router.get('/orders/:id', authToken, rescue(OrderController.readOrderbyId));
router.post('/checkout', authToken, validateSale, rescue(CustomerController.createSale));
router.patch('/orders/update/:id', authToken, rescue(CustomerController.updateSaleStatus));

module.exports = router;
