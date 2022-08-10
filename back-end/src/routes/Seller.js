const router = require('express').Router();
const rescue = require('express-rescue');
const SellerController = require('../controllers/Seller');

router.get('/orders', rescue(SellerController.getOrders));

module.exports = router;