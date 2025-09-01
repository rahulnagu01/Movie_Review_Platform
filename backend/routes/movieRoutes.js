const express = require('express');
const router = express.Router();
const { getMovies, getMovieById, createMovie } = require('../controllers/movieController');
const { protect, admin } = require('../middleware/auth');
const { body } = require('express-validator');

router.get('/', getMovies);
router.get('/:id', getMovieById);
router.post('/', protect, admin, [
  body('title').notEmpty().withMessage('title required')
], createMovie);

module.exports = router;
