const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const Review = require('../models/Review');
const Movie = require('../models/Movie');

// helper to recalc average
async function recalcMovieRating(movieId) {
  const agg = await Review.aggregate([
    { $match: { movie: movieId } },
    { $group: { _id: '$movie', avg: { $avg: '$rating' }, count: { $sum: 1 } } }
  ]);
  if (agg.length === 0) {
    await Movie.findByIdAndUpdate(movieId, { averageRating: 0, ratingsCount: 0 });
  } else {
    await Movie.findByIdAndUpdate(movieId, { averageRating: agg[0].avg, ratingsCount: agg[0].count });
  }
}

// GET /api/movies/:id/reviews
const getReviewsForMovie = asyncHandler(async (req, res) => {
  const movieId = req.params.id;
  const reviews = await Review.find({ movie: movieId }).populate('user', 'username profilePicture').sort({ createdAt: -1 });
  res.json(reviews);
});

// POST /api/movies/:id/reviews
const createReviewForMovie = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) { res.status(422); throw new Error(errors.array().map(e => e.msg).join(', ')); }

  const movieId = req.params.id;
  const { rating, reviewText } = req.body;

  const movie = await Movie.findById(movieId);
  if (!movie) { res.status(404); throw new Error('Movie not found'); }

  // unique user-movie check is in schema but handle errors gracefully
  const existing = await Review.findOne({ user: req.user._id, movie: movieId });
  if (existing) {
    res.status(400);
    throw new Error('User has already reviewed this movie');
  }

  const review = await Review.create({
    user: req.user._id,
    movie: movieId,
    rating,
    reviewText
  });

  await recalcMovieRating(movie._id);

  res.status(201).json(review);
});

module.exports = { getReviewsForMovie, createReviewForMovie };
