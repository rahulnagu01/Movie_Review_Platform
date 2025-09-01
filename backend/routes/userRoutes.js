const express = require('express');
const router = express.Router();
const { getUserProfile, updateUser } = require('../controllers/userController');
const { getWatchlist, addToWatchlist, removeFromWatchlist } = require('../controllers/watchlistController');
const { protect } = require('../middleware/auth');
const { body } = require('express-validator');

// user profile
router.get('/:id', protect, getUserProfile);
router.put('/:id', protect, [
  body('username').optional().isLength({ min: 2 }).withMessage('username too short'),
  body('password').optional().isLength({ min: 6 }).withMessage('password min 6 chars')
], updateUser);

// watchlist
router.get('/:id/watchlist', protect, getWatchlist);
router.post('/:id/watchlist', protect, [
  body('movieId').notEmpty().withMessage('movieId required')
], addToWatchlist);
router.delete('/:id/watchlist/:movieId', protect, removeFromWatchlist);

module.exports = router;
