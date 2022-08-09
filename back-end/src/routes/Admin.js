const router = require('express').Router();
const rescue = require('express-rescue');
const validateAdminRegister = require('../middlewares/validateAdminRegister');
const authToken = require('../middlewares/authToken');
const validateAdmin = require('../middlewares/validateAdmin');
const AdminController = require('../controllers/Admin');
const validateAdminDelete = require('../middlewares/validateAdminDelete');

router.get('/', authToken, validateAdmin, rescue(AdminController.getAll));

router.post('/', authToken, validateAdmin, validateAdminRegister, rescue(AdminController.create));

router.delete('/', authToken, validateAdmin, validateAdminDelete, rescue(AdminController.remove));

module.exports = router;