const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { body } = require('express-validator');
const validateRequest = require('../middleware/validateRequest');
const catchAsync = require('../utils/catchAsync');

// 📝 Registration route with validation
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('username').notEmpty().withMessage('Username is required'),
  ],
  validateRequest,
  catchAsync(authController.register)
);

// 🔑 Login route
router.post('/login', catchAsync(authController.login));

// 🚪 Logout route
router.post('/logout', catchAsync(authController.logout));

module.exports = router;