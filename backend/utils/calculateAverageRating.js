exports.calculateAverageRating = (reviews) => {
  if (!reviews.length) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return (sum / reviews.length).toFixed(1);
};