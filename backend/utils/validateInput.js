// Example: Validate review input
exports.validateReview = (rating, reviewText) => {
  if (typeof rating !== 'number' || rating < 1 || rating > 5) return false;
  if (typeof reviewText !== 'string' || reviewText.length < 1) return false;
  return true;
};