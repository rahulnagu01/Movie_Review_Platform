import api from './api';

const movieService = {
  getMovies: async (params = {}) => {
    try {
      // Clean up params - remove empty values
      const cleanParams = Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== '' && value !== null && value !== undefined && value !== 0) {
          acc[key] = value;
        }
        return acc;
      }, {});
      
      console.log('Fetching movies with params:', cleanParams);
      const response = await api.get('/movies', { params: cleanParams });
      console.log('Movies response:', response.data);
      
      // Handle paginated response
      if (response.data.movies) {
        return {
          movies: response.data.movies,
          totalPages: response.data.totalPages || 1,
          currentPage: response.data.currentPage || 1,
          total: response.data.total
        };
      }
      
      // If backend returns array directly
      if (Array.isArray(response.data)) {
        return {
          movies: response.data,
          totalPages: 1,
          currentPage: 1,
          total: response.data.length
        };
      }
      
      return response.data;
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  },

  getMovieById: async (id) => {
    try {
      console.log('Fetching movie ID:', id);
      const response = await api.get(`/movies/${id}`);
      console.log('Movie detail response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie:', error);
      throw error;
    }
  },

  // Add other methods...
};

export default movieService;

// import api from './api';

// const movieService = {
//   getMovies: async (params = {}) => {
//     const response = await api.get('/movies', { params });
//     return response.data;
//   },

//   getMovieById: async (id) => {
//     const response = await api.get(`/movies/${id}`);
//     return response.data;
//   },

//   createMovie: async (movieData) => {
//     const response = await api.post('/movies', movieData);
//     return response.data;
//   },

//   searchMovies: async (query) => {
//     const response = await api.get('/movies', { 
//       params: { q: query } 
//     });
//     return response.data;
//   },

//   getTrendingMovies: async () => {
//     const response = await api.get('/movies', { 
//       params: { 
//         sort: 'popularity',
//         limit: 10 
//       } 
//     });
//     return response.data;
//   },

//   getFeaturedMovie: async () => {
//     const response = await api.get('/movies', { 
//       params: { 
//         featured: true,
//         limit: 1 
//       } 
//     });
//     return response.data.movies?.[0] || null;
//   }
// };

// export default movieService;