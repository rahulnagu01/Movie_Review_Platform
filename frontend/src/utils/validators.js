export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  const errors = [];
  
  if (password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateUsername = (username) => {
  const errors = [];
  
  if (username.length < 3) {
    errors.push('Username must be at least 3 characters long');
  }
  
  if (username.length > 20) {
    errors.push('Username must be less than 20 characters');
  }
  
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    errors.push('Username can only contain letters, numbers, and underscores');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateReview = (rating, text) => {
  const errors = [];
  
  if (!rating || rating < 1 || rating > 5) {
    errors.push('Please select a rating between 1 and 5 stars');
  }
    if (!text || text.trim().length < 10) {
    errors.push('Review must be at least 10 characters long');
  }
  
  if (text && text.length > 1000) {
    errors.push('Review must be less than 1000 characters');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateMovieForm = (movieData) => {
  const errors = {};
  
  if (!movieData.title || movieData.title.trim().length === 0) {
    errors.title = 'Title is required';
  }
  
  if (!movieData.releaseYear || movieData.releaseYear < 1900 || movieData.releaseYear > new Date().getFullYear() + 1) {
    errors.releaseYear = 'Please enter a valid release year';
  }
  
  if (!movieData.genre || movieData.genre.length === 0) {
    errors.genre = 'Please select at least one genre';
  }
  
  if (!movieData.synopsis || movieData.synopsis.trim().length < 20) {
    errors.synopsis = 'Synopsis must be at least 20 characters long';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};