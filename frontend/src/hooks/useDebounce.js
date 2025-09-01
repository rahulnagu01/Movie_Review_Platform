import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../redux/slices/movieSlice';

export const useMovies = (filters = {}) => {
  const dispatch = useDispatch();
  const { movies, isLoading, isError, totalPages, currentPage } = useSelector((state) => state.movies);
  const [localFilters, setLocalFilters] = useState(filters);
  
  useEffect(() => {
    dispatch(fetchMovies(localFilters));
  }, [dispatch, localFilters]);
  
  const updateFilters = (newFilters) => {
    setLocalFilters({ ...localFilters, ...newFilters });
  };
  
  const refreshMovies = () => {
    dispatch(fetchMovies(localFilters));
  };
  
  return {
    movies,
    isLoading,
    isError,
    totalPages,
    currentPage,
    updateFilters,
    refreshMovies
  };
};