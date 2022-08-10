const router = require('express').Router();
const rescue = require('express-rescue');
const SellerController = require('../controllers/Seller');
const authToken = require('../middlewares/authToken');

router.get('/orders', rescue(SellerController.getOrders));
router.get('/orders/:id', authToken, rescue(SellerController.findById));
router.patch('/orders/update/:id', authToken, rescue(SellerController.update));

module.exports = router;