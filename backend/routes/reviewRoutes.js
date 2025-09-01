const express = require('express');
const router = express.Router({ mergeParams: true }); // movieId from parent
const { getReviewsForMovie, createReviewForMovie } = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');
const { body } = require('express-validator');

router.get('/:id/reviews', getReviewsForMovie); // alternative: GET /api/movies/:id/reviews
router.post('/:id/reviews', protect, [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('rating 1-5 required')
], createReviewForMovie);

module.exports = router;
