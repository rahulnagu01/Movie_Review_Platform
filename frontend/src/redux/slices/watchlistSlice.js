import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../../services/userService';
import omdbService from '../../services/omdbService';

const initialState = {
  watchlist: [],
  isLoading: false,
  isError: false,
  message: '',
};

// Fetch watchlist
export const fetchWatchlist = createAsyncThunk(
  'watchlist/fetch',
  async (userId, thunkAPI) => {
    try {
      const response = await userService.getUserWatchlist(userId);
      console.log('Watchlist API response:', response);
      
      // Handle different response formats
      let watchlistData = response.watchlist || response.data || response || [];
      
      // If watchlist items have nested movie objects
      if (watchlistData.length > 0 && watchlistData[0].movie) {
        watchlistData = watchlistData.map(item => ({
          ...item.movie,
          addedDate: item.addedDate || item.createdAt
        }));
      }
      
      // Try to enhance with OMDB data if API key exists
      if (process.env.REACT_APP_OMDB_API_KEY && watchlistData.length > 0) {
        try {
          const enhancedWatchlist = await Promise.all(
            watchlistData.map(async (movie) => {
              try {
                const omdbData = await omdbService.getMovieByTitle(
                  movie.title, 
                  movie.releaseYear
                );
                return {
                  ...movie,
                  posterUrl: (omdbData?.Poster && omdbData.Poster !== 'N/A') ? omdbData.Poster : movie.posterUrl,
                };
              } catch (error) {
                return movie;
              }
            })
          );
          return enhancedWatchlist;
        } catch (error) {
          console.log('OMDB enhancement failed, using original data');
          return watchlistData;
        }
      }
      
      return watchlistData;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to fetch watchlist';
      console.error('Watchlist fetch error:', error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Add to watchlist
export const addToWatchlist = createAsyncThunk(
  'watchlist/add',
  async ({ userId, movieId }, thunkAPI) => {
    try {
      const response = await userService.addToWatchlist(userId, movieId);
      // After adding, fetch the updated watchlist
      thunkAPI.dispatch(fetchWatchlist(userId));
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Remove from watchlist
export const removeFromWatchlist = createAsyncThunk(
  'watchlist/remove',
  async ({ userId, movieId }, thunkAPI) => {
    try {
      await userService.removeFromWatchlist(userId, movieId);
      return { movieId: parseInt(movieId) };
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    clearWatchlist: (state) => {
      state.watchlist = [];
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch watchlist
      .addCase(fetchWatchlist.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = '';
      })
      .addCase(fetchWatchlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.watchlist = action.payload;
        state.isError = false;
      })
      .addCase(fetchWatchlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.watchlist = [];
      })
      // Add to watchlist
      .addCase(addToWatchlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToWatchlist.fulfilled, (state) => {
        state.isLoading = false;
        // Watchlist will be refreshed by the thunk
      })
      .addCase(addToWatchlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Remove from watchlist
      .addCase(removeFromWatchlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromWatchlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.watchlist = state.watchlist.filter(
          movie => movie.id !== action.payload.movieId
        );
      })
      .addCase(removeFromWatchlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { clearWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // Initial state
// const initialState = {
//   watchlist: [],
//   isLoading: false,
//   isError: false,
//   message: '',
// };

// // Async thunks
// export const fetchWatchlist = createAsyncThunk(
//   'watchlist/fetch',
//   async (userId) => {
//     // Simulate API call
//     return [];
//   }
// );

// export const addToWatchlist = createAsyncThunk(
//   'watchlist/add',
//   async ({ userId, movieId }) => {
//     // Simulate API call
//     return { movieId };
//   }
// );

// export const removeFromWatchlist = createAsyncThunk(
//   'watchlist/remove',
//   async ({ userId, movieId }) => {
//     // Simulate API call
//     return { movieId };
//   }
// );

// // Slice
// const watchlistSlice = createSlice({
//   name: 'watchlist',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchWatchlist.pending, (state) => {
//         state.isLoading = true;
//       })
//             .addCase(fetchWatchlist.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.watchlist = action.payload;
//       })
//       .addCase(fetchWatchlist.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//       })
//       .addCase(addToWatchlist.fulfilled, (state, action) => {
//         state.watchlist.push(action.payload);
//       })
//       .addCase(removeFromWatchlist.fulfilled, (state, action) => {
//         state.watchlist = state.watchlist.filter(
//           movie => movie.id !== action.payload.movieId
//         );
//       });
//   },
// });

// export default watchlistSlice.reducer;