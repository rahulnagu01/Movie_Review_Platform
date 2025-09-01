const asyncHandler = require('express-async-handler');
const Movie = require('../models/Movie');
const Review = require('../models/Review');
const { validationResult } = require('express-validator');

// GET /api/movies
const getMovies = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page || '1'));
  const limit = Math.min(100, parseInt(req.query.limit || '10'));
  const skip = (page - 1) * limit;

  const filter = {};
  if (req.query.genre) filter.genre = { $in: req.query.genre.split(',') };
  if (req.query.year) filter.releaseYear = parseInt(req.query.year);
  if (req.query.minRating) filter.averageRating = { $gte: parseFloat(req.query.minRating) };

  if (req.query.q) {
    const q = req.query.q;
    filter.$or = [
      { title: new RegExp(q, 'i') },
      { director: new RegExp(q, 'i') },
      { cast: new RegExp(q, 'i') }
    ];
  }

  const total = await Movie.countDocuments(filter);
  const movies = await Movie.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 });

  res.json({ total, page, pages: Math.ceil(total / limit), movies });
});

// GET /api/movies/:id (with reviews)
const getMovieById = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    res.status(404); throw new Error('Movie not found');
  }

  const reviews = await Review.find({ movie: movie._id }).populate('user', 'username profilePicture').sort({ createdAt: -1 });

  res.json({ movie, reviews });
});

// POST /api/movies  (admin)
const createMovie = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) { res.status(422); throw new Error(errors.array().map(e => e.msg).join(', ')); }

  const { title, genre, releaseYear, director, cast, synopsis, posterUrl } = req.body;
  const movie = await Movie.create({ title, genre, releaseYear, director, cast, synopsis, posterUrl });

  res.status(201).json(movie);
});

module.exports = { getMovies, getMovieById, createMovie };
