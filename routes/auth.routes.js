const Router = require('express');
const router = new Router();

const authController = require('../controller/auth.controller');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/check', authController.checkAuth);

module.exports = router;
