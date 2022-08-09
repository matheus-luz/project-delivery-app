const router = require('express').Router();
const rescue = require('express-rescue');
const CustomerController = require('../controllers/Customer');
const authToken = require('../middlewares/authToken');

router.get('/products', authToken, rescue(CustomerController.readProducts));

module.exports = router;
