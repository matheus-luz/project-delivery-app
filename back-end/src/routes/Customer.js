const router = require('express').Router();
const rescue = require('express-rescue');
const CustomerController = require('../controllers/Customer');
const authToken = require('../middlewares/authToken');

router.get('/products', authToken, rescue(CustomerController.readProducts));

router.get('/orders/:id', authToken, rescue(CustomerController.readOne));

module.exports = router;
