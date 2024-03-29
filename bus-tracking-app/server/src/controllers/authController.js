// authController.js
const bcrypt = require('bcryptjs');
const rolesModel = require('../models/rolesModel');
const usersModel = require('../models/usersModel');
const { use } = require('../routes/authRoutes');
const { Pool } = require('pg');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();
const crypto = require('crypto');

const pool = new Pool({
  user: 'ubustrack',
  host: '10.150.208.251',
  database: 'bustrack1',
  password: 'Basu2001@@',
  port: 5444,

});

console.log("Email Service:", process.env.EMAIL_SERVICE);
console.log("Email User:", process.env.EMAIL_USER);
console.log("Email Password:", process.env.EMAIL_PASSWORD);
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  // Add other relevant options based on the requirements of your email service
});
module.exports = {
  login: async (req, res) => {
    const { login_id, password } = req.body;
    let checkdata;

    try {
      const user = await usersModel.getUserByLoginId(login_id);

      console.log('User:', user);
      // checkdata = {
      //   sentPass: password,
      //   cryptpass: user.password_hash,
      // };

      if (!user || !(await bcrypt.compare(password, user.password_hash))) {
        console.log('Invalid credentials');
        return res.status(401).json({ message: 'Invalid credentials' });
      }


      // check if user account is active or not.
      if (!user.is_active) {
        console.log('User account is not active');
        return res.status(401).json({ message: 'User account is not active' });
      }

      const roleId = await rolesModel.getRoleIdByName('user'); // Adjust based on your roles
      const userData = {
        id: user.user_id, // Update to match your user id column name
        email: user.email,
        role_id: roleId,
      };

      // You can generate a JWT here and send it as a response for further authentication.

      // res.json({ message: 'Login successful', user: userData });

      res.json({ message: 'Login successful', user: checkdata });

    } catch (error) {
      console.error('Login error:', error);
      console.log('Additional information:', checkdata);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  signup: async (req, res) => {
    const { login_id, email, password, role_id } = req.body;

    try {
      const existingUser = await usersModel.getUserByLoginId(login_id);

      if (existingUser) {
        return res.status(400).json({ message: 'Username is Taken ! Please Choose another' });
      }

      const checkEmail = await usersModel.getUserByEmail(email);

      if (checkEmail) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const roleId = role_id;

      const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password

      const verificationToken = crypto.randomBytes(32).toString('hex');

      const newUser = {
        login_id: login_id,
        email: email,
      };

      const createdUser = await usersModel.createUser(newUser);

      const newLogin = {
        user_id: createdUser.user_id,
        login_id: login_id,
        password: hashedPassword,
        verification_token: verificationToken,
        role_id: roleId,
      };

      const createdLogin = await usersModel.createLogin(newLogin);

      // console.log(process.env.EMAIL_SERVICE, process.env.EMAIL_USER, process.env.EMAIL_PASSWORD);

      // Send the verification email
      const verificationLink = `${process.env.FRONTEND_URL}/verify?token=${verificationToken}`;

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: createdUser.email,
        subject: 'Email Verification',
        html: `Click <a href="${verificationLink}">here</a> to verify your email.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Verification email error:', error);
        } else {
          console.log('Verification email sent:', info.response);
        }
      });

      // Handle the response or send confirmation here if needed
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  verifyEmail: async (req, res) => {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    try {
      // Verify the token against the stored token in the database
      const user = await usersModel.verifyEmail(token);
      console.log(user);
      if (!user) {
        return res.status(400).json({ message: 'Invalid token' });
      }

      // Redirect the user to a success page or send a success response
      res.redirect('http://localhost:3000');
    } catch (error) {
      console.error('Email verification error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  getRoles: async (req, res) => {
    try {
      // Fetch roles data from your database or wherever it is stored
      const roles = await rolesModel.getRoles();

      // Respond with the roles data
      res.status(200).json({ roles });
    } catch (error) {
      // Handle errors appropriately
      console.error('Error in getRoles:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  forgotPassword: async (req, res) => {

    const data = req.body;

    console.log(data.email);

    try {
      const user = await usersModel.getUserByEmail(data.email);
      if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
      }
      const token = crypto.randomBytes(32).toString('hex');
      const hashedToken = await bcrypt.hash(token, 10);
      // const hashedToken = token;

      // Create a new Date object and add one hour
      const expiryDate = new Date();
      expiryDate.setTime(expiryDate.getTime() + 3600000); // 1 hour

      const updatedUser = await usersModel.forgotPassword(user.user_id, {
        reset_password_token: hashedToken,
        reset_password_token_expiry: expiryDate,
      });

      const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}&userId=${user.user_id}`;
      console.log("Reset Link: " + resetLink);
      console.log("User Id: " + user.user_id);
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: data.email,
        subject: 'Password Reset',
        html: `Click <a href="${resetLink}">here</a> to reset your password.`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Password reset email error:', error);
        } else {
          console.log('Password reset email sent:', info.response);
        }
      });
      res.json({ message: 'Password reset email sent successfully' });
    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }

  },
  resetPassword: async (req, res) => {
    const { token, newPassword } = req.body;

    console.log("Token: " + token);
    console.log("New Pass: " + newPassword);

    try {
      const user = await usersModel.getUserByResetToken(token);

      console.log("User from auth controller");
      console.log(user);

      if (!user || !(await bcrypt.compare(token, user.reset_password_token))) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }

      // Update the user's password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      console.log("User ID to be updated: " + user.user_id);
      console.log("Hashed password to be updated: " + hashedPassword);

      // Update the password using the actual stored hashed token for comparison
      await usersModel.updatePassword(user.user_id, hashedPassword, user.reset_password_token);

      // Delete the reset token from the password_reset table
      await usersModel.deleteResetToken(user.user_id);

      res.json({ message: 'Password reset successful' });
    } catch (error) {
      console.error('Reset password error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

};