const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { body } = require('express-validator');

router.post('/register', [
  body('username').isLength({ min: 2 }).withMessage('username too short'),
  body('email').isEmail().withMessage('invalid email'),
  body('password').isLength({ min: 6 }).withMessage('password min 6 chars')
], register);

router.post('/login', login);

module.exports = router;
