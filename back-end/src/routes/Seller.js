const router = require('express').Router();
const rescue = require('express-rescue');
const SellerController = require('../controllers/Seller');
const authToken = require('../middlewares/authToken');

router.get('/orders', authToken, rescue(SellerController.getOrders));
router.get('/orders/:id', authToken, rescue(SellerController.findById));

module.exports = router;