// authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const rolesModel = require('../models/rolesModel');
const router = express.Router();

// Route for user login
router.post('/login', authController.login);

// Route for user signup
router.post('/signup', authController.signup);

// Add a new route in authRoutes.js
router.get('/verify', authController.verifyEmail);

// Get Roles
router.get('/getroles', (req, res) => authController.getRoles(req, res));


module.exports = router;
