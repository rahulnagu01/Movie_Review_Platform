export const GENRES = [
  'Action',
  'Adventure',
  'Animation',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Family',
  'Fantasy',
  'Horror',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Thriller',
  'War',
  'Western'
];

export const RATINGS = {
  G: 'General Audiences',
  PG: 'Parental Guidance',
  'PG-13': 'Parents Strongly Cautioned',
  R: 'Restricted',
  'NC-17': 'Adults Only'
};

export const SORT_OPTIONS = {
  RECENT: 'recent',
  POPULAR: 'popular',
  RATING_HIGH: 'rating-high',
  RATING_LOW: 'rating-low',
  TITLE_AZ: 'title-az',
  TITLE_ZA: 'title-za'
};

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh'
  },
  MOVIES: {
    BASE: '/movies',
    TRENDING: '/movies/trending',
    FEATURED: '/movies/featured'
  },
  USERS: {
    BASE: '/users',
    PROFILE: '/users/profile',
    WATCHLIST: '/users/watchlist'
  }
};

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
  MAX_LIMIT: 50
};