const router = require('express').Router();
const rescue = require('express-rescue');
const CustomerController = require('../controllers/Customer');
const authToken = require('../middlewares/authToken');

router.get('/products', authToken, rescue(CustomerController.readProducts));
router.post('/checkout', authToken, rescue(CustomerController.createSale));
router.patch('/statusUpdate/:id', authToken, rescue(CustomerController.updateSaleStatus));

module.exports = router;
