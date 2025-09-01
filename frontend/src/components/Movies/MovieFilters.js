// src/components/Movies/MovieFilters.js
import React from 'react';
import styled from 'styled-components';

const FiltersContainer = styled.aside`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 100px;
  height: fit-content;
`;

const FilterSection = styled.div`
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FilterTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #333;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.95rem;
  background-color: white;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #FFD700;
  }
`;

const RatingSlider = styled.div`
  margin-top: 1rem;
`;

const SliderInput = styled.input`
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #ddd;
  outline: none;
  -webkit-appearance: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #FFD700;
    cursor: pointer;
  }
  
  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #FFD700;
    cursor: pointer;
    border: none;
  }
`;

const SliderValue = styled.div`
  text-align: right;
  margin-top: 0.5rem;
  color: #666;
  font-size: 0.9rem;
`;

const ResetButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #f5f5f5;
  border: none;
  border-radius: 8px;
  color: #666;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: #e0e0e0;
    color: #333;
  }
`;

const MovieFilters = ({ filters, onFilterChange, onReset }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);
  
  const genres = [
    'Action', 'Adventure', 'Animation', 'Comedy', 'Crime',
    'Documentary', 'Drama', 'Family', 'Fantasy', 'Horror',
    'Mystery', 'Romance', 'Sci-Fi', 'Thriller', 'War'
  ];

  return (
    <FiltersContainer>
      <FilterTitle>Filters</FilterTitle>
      
      <FilterSection>
        <FilterTitle>Genre</FilterTitle>
        <Select
          value={filters.genre || ''}
          onChange={(e) => onFilterChange({ ...filters, genre: e.target.value })}
        >
          <option value="">All Genres</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </Select>
      </FilterSection>
      
      <FilterSection>
        <FilterTitle>Release Year</FilterTitle>
        <Select
          value={filters.year || ''}
          onChange={(e) => onFilterChange({ ...filters, year: e.target.value })}
        >
          <option value="">Any Year</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </Select>
      </FilterSection>
      
      <FilterSection>
        <FilterTitle>Minimum Rating</FilterTitle>
        <RatingSlider>
          <SliderInput
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={filters.minRating || 0}
            onChange={(e) => onFilterChange({ ...filters, minRating: parseFloat(e.target.value) })}
          />
          <SliderValue>{filters.minRating || 0}+ ⭐</SliderValue>
        </RatingSlider>
      </FilterSection>
      
      <ResetButton onClick={onReset}>
        Reset Filters
      </ResetButton>
    </FiltersContainer>
  );
};

export default MovieFilters;