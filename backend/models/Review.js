const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true, index: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  reviewText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

ReviewSchema.index({ user: 1, movie: 1 }, { unique: true }); // one review per user per movie

module.exports = mongoose.model('Review', ReviewSchema);
