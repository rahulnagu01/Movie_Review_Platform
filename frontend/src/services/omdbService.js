import axios from 'axios';

const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const OMDB_BASE_URL = 'https://www.omdbapi.com/';

const omdbService = {
  searchMovies: async (title, year) => {
    try {
      const response = await axios.get(OMDB_BASE_URL, {
        params: {
          apikey: OMDB_API_KEY,
          s: title,
          y: year,
          type: 'movie'
        }
      });
      return response.data;
    } catch (error) {
      console.error('OMDB API Error:', error);
      return null;
    }
  },

  getMovieDetails: async (imdbId) => {
    try {
      const response = await axios.get(OMDB_BASE_URL, {
        params: {
          apikey: OMDB_API_KEY,
          i: imdbId,
          plot: 'full'
        }
      });
      return response.data;
    } catch (error) {
      console.error('OMDB API Error:', error);
      return null;
    }
  },

  getMovieByTitle: async (title, year) => {
    try {
      const response = await axios.get(OMDB_BASE_URL, {
        params: {
          apikey: OMDB_API_KEY,
          t: title,
          y: year,
          plot: 'full'
        }
      });
      return response.data;
    } catch (error) {
      console.error('OMDB API Error:', error);
      return null;
    }
  }
};

export default omdbService;