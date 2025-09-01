const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../generateToken');

// POST /api/auth/register
const register = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422);
    throw new Error(errors.array().map(e => e.msg).join(', '));
  }

  const { username, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) {
    res.status(400);
    throw new Error('Email already in use');
  }

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const isAdmin = (process.env.ADMIN_EMAIL && email === process.env.ADMIN_EMAIL) ? true : false;

  const user = await User.create({ username, email, password: hashed, isAdmin });

  res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    profilePicture: user.profilePicture,
    isAdmin: user.isAdmin,
    token: generateToken(user)
  });
});

// POST /api/auth/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  res.json({
    _id: user._id,
    username: user.username,
    email: user.email,
    profilePicture: user.profilePicture,
    isAdmin: user.isAdmin,
    token: generateToken(user)
  });
});

module.exports = { register, login };
