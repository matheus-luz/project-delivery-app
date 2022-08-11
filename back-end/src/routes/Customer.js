const router = require('express').Router();
const rescue = require('express-rescue');
const CustomerController = require('../controllers/Customer');
const authToken = require('../middlewares/authToken');
const validateSale = require('../middlewares/validateSale');

router.get('/products', authToken, rescue(CustomerController.readProducts));
router.post('/checkout', authToken, validateSale, rescue(CustomerController.createSale));
router.get('/orders/:id', authToken, rescue(CustomerController.readOne));
router.patch('/orders/update/:id', authToken, rescue(CustomerController.updateSaleStatus));

module.exports = router;
