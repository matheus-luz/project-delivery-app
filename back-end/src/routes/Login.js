const router = require('express').Router();
const rescue = require('express-rescue');
const LoginController = require('../controllers/Login');
const validateLogin = require('../middlewares/validateLogin');

router.post('/', validateLogin, rescue(LoginController));

module.exports = router;