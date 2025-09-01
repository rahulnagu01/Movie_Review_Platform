export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const formatRuntime = (minutes) => {
  if (!minutes) return 'N/A';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

export const generateAvatarColor = (name) => {
  const colors = [
    '#667eea',
    '#764ba2',
    '#f093fb',
    '#f5576c',
    '#4facfe',
    '#43e97b',
    '#fa709a',
    '#fee140',
    '#30cfd0',
    '#a8edea'
  ];
  
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const getYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= 1900; year--) {
    years.push(year);
  }
  return years;
};

export const sortMovies = (movies, sortBy) => {
  const sorted = [...movies];
  
  switch (sortBy) {
    case 'title-az':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'title-za':
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case 'rating-high':
      return sorted.sort((a, b) => b.averageRating - a.averageRating);
    case 'rating-low':
      return sorted.sort((a, b) => a.averageRating - b.averageRating);
    case 'year-new':
      return sorted.sort((a, b) => b.releaseYear - a.releaseYear);
    case 'year-old':
      return sorted.sort((a, b) => a.releaseYear - b.releaseYear);
    default:
      return sorted;
  }
};