// src/pages/MoviesPage.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout/Layout';
import MovieGrid from '../components/Movies/MovieGrid';
import MovieFilters from '../components/Movies/MovieFilters';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import { fetchMovies } from '../redux/slices/movieSlice';

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #333;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.main`
  min-height: 400px;
`;

const ResultsInfo = styled.div`
  margin-bottom: 1.5rem;
  color: #666;
  font-size: 1.1rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 3rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #e0e0e0;
  background-color: ${props => props.active ? '#FFD700' : 'white'};
  color: ${props => props.active ? '#333' : '#666'};
  border-radius: 8px;
  cursor: pointer;
  font-weight: ${props => props.active ? '600' : '400'};
  transition: all 0.3s;
  
  &:hover:not(:disabled) {
    background-color: ${props => props.active ? '#FFD700' : '#f5f5f5'};
    border-color: #FFD700;
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const MoviesPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { movies, isLoading, totalPages, currentPage } = useSelector((state) => state.movies || {});
  
  const [filters, setFilters] = useState({
    genre: searchParams.get('genre') || '',
    year: searchParams.get('year') || '',
    minRating: searchParams.get('minRating') || 0,
    search: searchParams.get('search') || ''
  });

  useEffect(() => {
    const params = {
      page: searchParams.get('page') || 1,
      limit: 12,
      q: filters.search,
      genre: filters.genre,
      year: filters.year,
      minRating: filters.minRating
    };
    
    dispatch(fetchMovies(params));
  }, [dispatch, searchParams, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    
    // Update URL params
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    setSearchParams(params);
  };

  const handlePageChange = (page) => {
    searchParams.set('page', page);
    setSearchParams(searchParams);
    window.scrollTo(0, 0);
  };

  const handleReset = () => {
    setFilters({
      genre: '',
      year: '',
      minRating: 0,
      search: ''
    });
    setSearchParams(new URLSearchParams());
  };

  // Mock data for testing
  const mockMovies = movies?.length > 0 ? movies : [
    { id: 1, title: 'The Crimson Tide', releaseYear: 2023, averageRating: 4.5, genre: 'Action', posterUrl: null },
    { id: 2, title: 'Echoes of the Past', releaseYear: 2023, averageRating: 4.2, genre: 'Drama', posterUrl: null },
    { id: 3, title: 'The Silent Witness', releaseYear: 2023, averageRating: 4.7, genre: 'Thriller', posterUrl: null },
    { id: 4, title: 'Beneath the Surface', releaseYear: 2023, averageRating: 4.0, genre: 'Mystery', posterUrl: null },
    { id: 5, title: 'Whispers of the Wind', releaseYear: 2023, averageRating: 4.3, genre: 'Romance', posterUrl: null },
    { id: 6, title: 'The Last Frontier', releaseYear: 2023, averageRating: 4.8, genre: 'Adventure', posterUrl: null },
    { id: 7, title: 'Shadows of Deception', releaseYear: 2023, averageRating: 4.1, genre: 'Crime', posterUrl: null },
    { id: 8, title: 'The Forgotten Melody', releaseYear: 2023, averageRating: 4.6, genre: 'Musical', posterUrl: null },
    { id: 9, title: 'The Hidden Path', releaseYear: 2023, averageRating: 4.4, genre: 'Fantasy', posterUrl: null },
    { id: 10, title: 'Echoes of Silence', releaseYear: 2023, averageRating: 4.2, genre: 'Horror', posterUrl: null },
    { id: 11, title: 'The Ironclad Heart', releaseYear: 2023, averageRating: 4.5, genre: 'Sci-Fi', posterUrl: null },
    { id: 12, title: 'Beneath the Veil', releaseYear: 2023, averageRating: 4.3, genre: 'Drama', posterUrl: null },
  ];

  return (
    <Layout>
      <Container>
        <PageTitle>All Movies</PageTitle>
        
        <ContentWrapper>
          <aside>
            <MovieFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleReset}
            />
          </aside>
          
          <MainContent>
            {!isLoading && mockMovies.length > 0 && (
              <ResultsInfo>
                Showing {mockMovies.length} movies
                {filters.search && ` for "${filters.search}"`}
              </ResultsInfo>
            )}
            
            <MovieGrid movies={mockMovies} loading={isLoading} />
            
            {totalPages > 1 && (
              <Pagination>
                <PageButton
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </PageButton>
                
                {[...Array(Math.min(totalPages, 5))].map((_, index) => {
                  const pageNum = index + 1;
                  return (
                    <PageButton
                      key={pageNum}
                      active={pageNum === currentPage}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </PageButton>
                  );
                })}
                
                <PageButton
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </PageButton>
              </Pagination>
            )}
          </MainContent>
        </ContentWrapper>
      </Container>
    </Layout>
  );
};

export default MoviesPage;