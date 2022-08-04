const LoginController = require('../controllers/Login');

const router = require('express').Router();

router.post('/', LoginController);

module.exports = router;