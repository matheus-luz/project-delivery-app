const router = require('express').Router();
const rescue = require('express-rescue');
const CustomerController = require('../controllers/Customer');
const validateToken = require('../middlewares/validateToken');

router.get('/products', validateToken, rescue(CustomerController.readProducts));
router.post('/checkout', validateToken, rescue(CustomerController.createSale));

module.exports = router;
