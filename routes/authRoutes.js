const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const auth = require('../middleware/auth');
const { validate, registerSchema, loginSchema } = require('../middleware/validation');

// @route   POST /api/auth/register
// Register a new user
router.post('/register', validate(registerSchema), register);

// @route   POST /api/auth/login
// Login user
router.post('/login', validate(loginSchema), login);

// @route   GET /api/auth/me
// Get current user
router.get('/me', auth, getMe);

module.exports = router;