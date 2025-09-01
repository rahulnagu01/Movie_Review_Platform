// src/components/Movies/MovieGrid.js
import React from 'react';
import styled from 'styled-components';
import MovieCard from './MovieCard';
import LoadingSpinner from '../Common/LoadingSpinner';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const NoMoviesMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
  font-size: 1.2rem;
`;

const MovieGrid = ({ movies, loading }) => {
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!movies || movies.length === 0) {
    return (
      <NoMoviesMessage>
        No movies found. Try adjusting your filters.
      </NoMoviesMessage>
    );
  }
  
  return (
    <GridContainer>
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </GridContainer>
  );
};

export default MovieGrid;