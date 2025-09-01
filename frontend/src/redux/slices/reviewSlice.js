import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  reviews: [],
  userReviews: [],
  isLoading: false,
  isError: false,
  message: '',
};

// Async thunks
export const fetchMovieReviews = createAsyncThunk(
  'reviews/fetchMovieReviews',
  async (movieId) => {
    // Simulate API call
    return [];
  }
);

export const submitReview = createAsyncThunk(
  'reviews/submit',
  async (reviewData) => {
    // Simulate API call
    return reviewData;
  }
);

// Slice
const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMovieReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchMovieReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(submitReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      });
  },
});

export default reviewSlice.reducer;