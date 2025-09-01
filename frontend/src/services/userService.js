import api from './api';

const userService = {
  getUserProfile: async (userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },

    updateUserProfile: async (userId, userData) => {
    const response = await api.put(`/users/${userId}`, userData);
    return response.data;
  },

  getUserWatchlist: async (userId) => {
    try {
      console.log('Fetching watchlist for user:', userId);
      const response = await api.get(`/users/${userId}/watchlist`);
      console.log('Watchlist response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching watchlist:', error);
      throw error;
    }
  },

  addToWatchlist: async (userId, movieId) => {
    try {
      console.log('Adding to watchlist:', { userId, movieId });
      const response = await api.post(`/users/${userId}/watchlist`, { movieId });
      console.log('Add to watchlist response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      throw error;
    }
  },

  removeFromWatchlist: async (userId, movieId) => {
    try {
      console.log('Removing from watchlist:', { userId, movieId });
      const response = await api.delete(`/users/${userId}/watchlist/${movieId}`);
      console.log('Remove from watchlist response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error removing from watchlist:', error);
      throw error;
    }
  },

  getUserStats: async (userId) => {
    try {
      // If your backend doesn't have a stats endpoint, calculate from other data
      const response = await api.get(`/users/${userId}/stats`);
      return response.data;
    } catch (error) {
      // Return default stats if endpoint doesn't exist
      console.log('Stats endpoint not available, returning defaults');
      return {
        totalMoviesWatched: 0,
        averageRating: 0,
        totalWatchTime: 0,
        thisMonthCount: 0
      };
    }
  }
};

export default userService;