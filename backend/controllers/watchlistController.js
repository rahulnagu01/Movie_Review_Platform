const asyncHandler = require('express-async-handler');
const Watchlist = require('../models/Watchlist');
const Movie = require('../models/Movie');

// GET /api/users/:id/watchlist
const getWatchlist = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  // allow only owner or admin
  if (req.user._id.toString() !== userId && !req.user.isAdmin) {
    res.status(403); throw new Error('Not allowed');
  }

  const list = await Watchlist.find({ user: userId }).populate('movie', 'title posterUrl releaseYear').sort({ addedAt: -1 });
  res.json(list);
});

// POST /api/users/:id/watchlist  body: { movieId }
const addToWatchlist = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  if (req.user._id.toString() !== userId && !req.user.isAdmin) {
    res.status(403); throw new Error('Not allowed');
  }

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) { res.status(404); throw new Error('Movie not found'); }

  const record = await Watchlist.findOne({ user: userId, movie: req.body.movieId });
  if (record) {
    res.status(400); throw new Error('Movie already in watchlist');
  }

  const newEntry = await Watchlist.create({ user: userId, movie: req.body.movieId });
  res.status(201).json(newEntry);
});

// DELETE /api/users/:id/watchlist/:movieId
const removeFromWatchlist = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  if (req.user._id.toString() !== userId && !req.user.isAdmin) {
    res.status(403); throw new Error('Not allowed');
  }

  const deleted = await Watchlist.findOneAndDelete({ user: userId, movie: req.params.movieId });
  if (!deleted) {
    res.status(404); throw new Error('Watchlist item not found');
  }
  res.json({ message: 'Removed' });
});

module.exports = { getWatchlist, addToWatchlist, removeFromWatchlist };
