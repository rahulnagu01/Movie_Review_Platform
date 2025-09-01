const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Review = require('../models/Review');
const Watchlist = require('../models/Watchlist');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// GET /api/users/:id
const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId).select('-password');
  if (!user) { res.status(404); throw new Error('User not found'); }

  const reviews = await Review.find({ user: userId }).populate('movie', 'title posterUrl releaseYear').sort({ createdAt: -1 });
  const watchlist = await Watchlist.find({ user: userId }).populate('movie', 'title posterUrl releaseYear').sort({ addedAt: -1 });

  res.json({ user, reviews, watchlist });
});

// PUT /api/users/:id  (user must be same as req.user or admin)
const updateUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) { res.status(422); throw new Error(errors.array().map(e => e.msg).join(', ')); }

  const userId = req.params.id;
  if (req.user._id.toString() !== userId && !req.user.isAdmin) {
    res.status(403); throw new Error('Not allowed to update this profile');
  }

  const user = await User.findById(userId);
  if (!user) { res.status(404); throw new Error('User not found'); }

  const { username, profilePicture, password } = req.body;
  if (username) user.username = username;
  if (profilePicture) user.profilePicture = profilePicture;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
  }

  await user.save();
  res.json({ _id: user._id, username: user.username, email: user.email, profilePicture: user.profilePicture });
});

module.exports = { getUserProfile, updateUser };
