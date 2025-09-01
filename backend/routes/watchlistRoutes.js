const express = require('express');
const router = express.Router();
const watchlistController = require('../controllers/watchlistController');
const { isAuthenticated } = require('../middleware/auth');

// GET watchlist for logged-in user
router.get('/', isAuthenticated, (req, res, next) => {
  watchlistController.getUserWatchlist(req, res, next);
});

module.exports = router;