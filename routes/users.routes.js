const express = require('express');
const authMiddleware = require('../middleware/auth-Middleware');
const router = express.Router();

const UserController = require('../controllers/users.controllers');
const userController = new UserController();

router.post('/signup', userController.signupUser);
router.post('/login', userController.loginUser);

module.exports = router;
