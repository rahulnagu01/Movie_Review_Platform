const mongoose = require('mongoose');

const WatchlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true, index: true },
  addedAt: { type: Date, default: Date.now }
});

WatchlistSchema.index({ user: 1, movie: 1 }, { unique: true });

module.exports = mongoose.model('Watchlist', WatchlistSchema);
