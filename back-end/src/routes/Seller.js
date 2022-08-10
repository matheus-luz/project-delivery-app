const router = require('express').Router();
const rescue = require('express-rescue');
const SellerController = require('../controllers/Seller');

router.get('/orders', rescue(SellerController.getOrders));
router.get('/orders/:id', rescue(SellerController.findById));

module.exports = router;