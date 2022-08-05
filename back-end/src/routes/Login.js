const router = require('express').Router();
const rescue = require('express-rescue');
const LoginController = require('../controllers/Login');

router.post('/', rescue(LoginController));

module.exports = router;