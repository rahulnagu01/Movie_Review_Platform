// src/pages/HomePage.js
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout/Layout';
import FeaturedMovie from '../components/Movies/FeaturedMovie';
import TrendingMovies from '../components/Movies/TrendingMovies';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import { fetchMovies } from '../redux/slices/movieSlice';

const Container = styled.div`
  min-height: 100vh;
`;

const ContentSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 3rem;
`;

const HomePage = () => {
  const dispatch = useDispatch();
  const { movies, isLoading } = useSelector((state) => state.movies || {});

  useEffect(() => {
    // Fetch movies when component mounts
    dispatch(fetchMovies({ limit: 20 }));
  }, [dispatch]);

  // Mock data for testing (replace with real data from API)
  const featuredMovie = {
    id: 1,
    title: 'The Last Frontier',
    genre: 'Adventure',
    releaseYear: 2023,
    synopsis: 'An epic tale of survival and discovery at the edge of the known world. A must-watch for adventure lovers.',
    posterUrl: null,
    averageRating: 4.8,
    tagline: 'Where civilization ends, the journey begins'
  };

  const trendingMovies = movies?.slice(0, 6) || [
    { id: 1, title: 'The Silent Echo', releaseYear: 2023, averageRating: 4.5, posterUrl: null },
    { id: 2, title: 'The Crimson Tide', releaseYear: 2023, averageRating: 4.2, posterUrl: null },
    { id: 3, title: 'The Ironclad Heart', releaseYear: 2023, averageRating: 4.7, posterUrl: null },
    { id: 4, title: 'The Velvet Curtain', releaseYear: 2023, averageRating: 4.0, posterUrl: null },
    { id: 5, title: 'The Obsidian Mirror', releaseYear: 2023, averageRating: 4.3, posterUrl: null },
    { id: 6, title: 'City of Ghosts', releaseYear: 2023, averageRating: 4.6, posterUrl: null },
  ];

  if (isLoading && !movies?.length) {
    return (
      <Layout>
        <LoadingSpinner fullScreen />
      </Layout>
    );
  }

  return (
    <Layout>
      <Container>
        <FeaturedMovie movie={featuredMovie} />
        
        <ContentSection>
          <TrendingMovies 
            movies={trendingMovies} 
            title="Trending Now"
          />
          
          <TrendingMovies 
            movies={trendingMovies.slice(0, 5)} 
            title="New Releases"
          />
          
          <TrendingMovies 
            movies={trendingMovies.slice(1, 6)} 
            title="Top Rated"
          />
        </ContentSection>
      </Container>
    </Layout>
  );
};

export default HomePage;