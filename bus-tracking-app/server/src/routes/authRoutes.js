// authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const rolesModel = require('../models/rolesModel');
const router = express.Router();

// Route for user login
router.post('/login', authController.login);

// Route for user signup
router.post('/signup', authController.signup);

// Email Verify
router.get('/verify', authController.verifyEmail);

// Forget Password
router.post('/forgot-password', authController.forgotPassword)

// Reset password from mail link
router.post('/reset-password', authController.resetPassword);

// Get Roles
router.get('/getroles', (req, res) => authController.getRoles(req, res));


module.exports = router;