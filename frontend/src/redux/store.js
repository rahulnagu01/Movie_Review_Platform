import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import movieReducer from './slices/movieSlice';
import reviewReducer from './slices/reviewSlice';
import watchlistReducer from './slices/watchlistSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: movieReducer,
    reviews: reviewReducer,
    watchlist: watchlistReducer,
  },
});