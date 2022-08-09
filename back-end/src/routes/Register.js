const router = require('express').Router();
const rescue = require('express-rescue');
const RegisterController = require('../controllers/Register');
const validateRegister = require('../middlewares/validateRegister');

router.post('/', validateRegister, rescue(RegisterController));

module.exports = router;