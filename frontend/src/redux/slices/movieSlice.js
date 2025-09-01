import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import movieService from '../../services/movieService';
import omdbService from '../../services/omdbService';

const initialState = {
  movies: [],
  currentMovie: null,
  totalPages: 0,
  currentPage: 1,
  isLoading: false,
  isError: false,
  message: '',
};

// Fetch movies with OMDB data
export const fetchMovies = createAsyncThunk(
  'movies/fetchAll',
  async (params, thunkAPI) => {
    try {
      console.log('Fetching movies with params:', params);
      const response = await movieService.getMovies(params);
      console.log('Movies API response:', response);
      
      // Handle different response formats from backend
      let moviesData = response.movies || response.data || [];
      const totalPages = response.totalPages || response.pages || 1;
      const currentPage = response.currentPage || response.page || 1;
      
      // Only enhance with OMDB if we have an API key and movies
      if (process.env.REACT_APP_OMDB_API_KEY && moviesData.length > 0) {
        try {
          const enhancedMovies = await Promise.all(
            moviesData.slice(0, 10).map(async (movie) => { // Limit OMDB calls
              try {
                const omdbData = await omdbService.getMovieByTitle(movie.title, movie.releaseYear);
                return {
                  ...movie,
                  posterUrl: (omdbData?.Poster && omdbData.Poster !== 'N/A') ? omdbData.Poster : movie.posterUrl,
                  imdbRating: omdbData?.imdbRating,
                  plot: omdbData?.Plot || movie.synopsis
                };
              } catch (error) {
                return movie;
              }
            })
          );
          
          // Combine enhanced and non-enhanced movies
          moviesData = [
            ...enhancedMovies,
            ...moviesData.slice(10)
          ];
        } catch (error) {
          console.log('OMDB enhancement failed, using original data');
        }
      }
      
      return {
        movies: moviesData,
        totalPages,
        currentPage
      };
    } catch (error) {
      console.error('Movie fetch error:', error);
      const message = error.response?.data?.message || error.message || 'Failed to fetch movies';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Fetch single movie
export const fetchMovieById = createAsyncThunk(
  'movies/fetchById',
  async (id, thunkAPI) => {
    try {
      console.log('Fetching movie with ID:', id);
      const movie = await movieService.getMovieById(id);
      console.log('Movie API response:', movie);
      
      // Handle different response formats
      const movieData = movie.movie || movie.data || movie;
      
      // Enhance with OMDB data if available
      if (process.env.REACT_APP_OMDB_API_KEY && movieData.title) {
        try {
          const omdbData = await omdbService.getMovieByTitle(movieData.title, movieData.releaseYear);
          return {
            ...movieData,
            posterUrl: (omdbData?.Poster && omdbData.Poster !== 'N/A') ? omdbData.Poster : movieData.posterUrl,
            imdbRating: omdbData?.imdbRating,
            plot: omdbData?.Plot || movieData.synopsis,
            runtime: omdbData?.Runtime || movieData.runtime,
            actors: omdbData?.Actors || movieData.cast,
            director: omdbData?.Director || movieData.director,
            awards: omdbData?.Awards
          };
        } catch (error) {
          console.log('OMDB enhancement failed for single movie');
          return movieData;
        }
      }
      
      return movieData;
    } catch (error) {
      console.error('Single movie fetch error:', error);
      const message = error.response?.data?.message || error.message || 'Failed to fetch movie';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create movie (admin only)
export const createMovie = createAsyncThunk(
  'movies/create',
  async (movieData, thunkAPI) => {
    try {
      const response = await movieService.createMovie(movieData);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    resetMovieState: (state) => {
      state.isError = false;
      state.message = '';
    },
    clearCurrentMovie: (state) => {
      state.currentMovie = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch movies
      .addCase(fetchMovies.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = '';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movies = action.payload.movies;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.isError = false;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.movies = [];
      })
      // Fetch movie by ID
      .addCase(fetchMovieById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = '';
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentMovie = action.payload;
        state.isError = false;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.currentMovie = null;
      })
      // Create movie
      .addCase(createMovie.fulfilled, (state, action) => {
        state.movies.push(action.payload);
      });
  },
});

export const { resetMovieState, clearCurrentMovie } = movieSlice.actions;
export default movieSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // Initial state
// const initialState = {
//   movies: [],
//   currentMovie: null,
//   totalPages: 0,
//   currentPage: 1,
//   isLoading: false,
//   isError: false,
//   message: '',
// };

// // Async thunks
// export const fetchMovies = createAsyncThunk(
//   'movies/fetchAll',
//   async (params) => {
//     // Simulate API call
//     return {
//       movies: [],
//       totalPages: 1,
//       currentPage: 1
//     };
//   }
// );

// export const fetchMovieById = createAsyncThunk(
//   'movies/fetchById',
//   async (id) => {
//     // Simulate API call
//     return {
//       id,
//       title: 'Test Movie',
//       releaseYear: 2023,
//       genre: 'Drama',
//       averageRating: 4.5
//     };
//   }
// );

// // Slice
// const movieSlice = createSlice({
//   name: 'movies',
//   initialState,
//   reducers: {
//     resetMovieState: (state) => {
//       state.isError = false;
//       state.message = '';
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch movies
//       .addCase(fetchMovies.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(fetchMovies.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.movies = action.payload.movies;
//         state.totalPages = action.payload.totalPages;
//         state.currentPage = action.payload.currentPage;
//       })
//       .addCase(fetchMovies.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//       })
//       // Fetch movie by ID
//       .addCase(fetchMovieById.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(fetchMovieById.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.currentMovie = action.payload;
//       })
//       .addCase(fetchMovieById.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//       });
//   },
// });

// export const { resetMovieState } = movieSlice.actions;
// export default movieSlice.reducer;