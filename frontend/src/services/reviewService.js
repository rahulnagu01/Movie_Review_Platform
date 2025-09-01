import api from './api';

const reviewService = {
  getMovieReviews: async (movieId, params = {}) => {
    const response = await api.get(`/movies/${movieId}/reviews`, { params });
    return response.data;
  },

  createReview: async (movieId, reviewData) => {
    const response = await api.post(`/movies/${movieId}/reviews`, reviewData);
    return response.data;
  },

  updateReview: async (reviewId, reviewData) => {
    const response = await api.put(`/reviews/${reviewId}`, reviewData);
    return response.data;
  },

  deleteReview: async (reviewId) => {
    const response = await api.delete(`/reviews/${reviewId}`);
    return response.data;
  },

  getUserReviews: async (userId) => {
    const response = await api.get(`/users/${userId}/reviews`);
    return response.data;
  }
};

export default reviewService;