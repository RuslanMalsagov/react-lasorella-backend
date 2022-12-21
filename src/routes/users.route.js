const { usersController } = require('../controllers/users.controller');
const { body } = require('express-validator');

const { Router } = require('express');

const router = Router();

router.post('/registration', body('email').isEmail(), body('password').isLength({ min: 3, max: 32 }), usersController.registerUser);
router.post('/login', usersController.login);
router.post('/logout', usersController.logout);
router.get('/refresh', usersController.refreshToken);
router.get('/users', usersController.getUsers);

module.exports = router;
