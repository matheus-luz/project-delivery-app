const router = require('express').Router();
const LoginController = require('../controllers/Login');

router.post('/', LoginController);

module.exports = router;