// src/pages/MovieDetailPage.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout/Layout';
import MoviePoster from '../components/Movies/MoviePoster';
import MovieInfo from '../components/MovieDetail/MovieInfo';
import MovieActions from '../components/MovieDetail/MovieActions';
import MovieTrailer from '../components/MovieDetail/MovieTrailer';
import CastList from '../components/MovieDetail/CastList';
import ReviewForm from '../components/Reviews/ReviewForm';
import ReviewList from '../components/Reviews/ReviewList';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import { fetchMovieById } from '../redux/slices/movieSlice';
import { submitReview, fetchMovieReviews } from '../redux/slices/reviewSlice';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const MovieHeader = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const PosterSection = styled.div`
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
  }
`;

const InfoSection = styled.div``;

const ContentSection = styled.section`
  margin-bottom: 3rem;
`;

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentMovie, isLoading } = useSelector((state) => state.movies || {});
  const { reviews, isLoading: reviewsLoading } = useSelector((state) => state.reviews || {});
  const { user } = useSelector((state) => state.auth);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieById(id));
      dispatch(fetchMovieReviews(id));
    }
  }, [dispatch, id]);

  const handleReviewSubmit = async (reviewData) => {
    try {
      await dispatch(submitReview({ movieId: id, ...reviewData })).unwrap();
      setShowReviewForm(false);
      dispatch(fetchMovieReviews(id)); // Refresh reviews
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  if (isLoading || !currentMovie) {
    return (
      <Layout>
        <LoadingSpinner fullScreen />
      </Layout>
    );
  }

  // Mock movie data for testing
  const movie = currentMovie || {
    id: 1,
    title: 'The Midnight Bloom',
    releaseYear: 2023,
    genre: 'Drama, Romance',
    director: 'Sarah Anderson',
    cast: [],
    synopsis: 'In the heart of a bustling city, two strangers, Amelia and Ethan, find their paths intertwined by a chance encounter at a hidden flower shop. As they navigate the complexities of life and love, they discover that their connection is as delicate and beautiful as the midnight bloom they both cherish.',
    posterUrl: null,
    averageRating: 4.2,
    reviewCount: 1234,
    runtime: 120,
    rating: 'PG-13',
    trailerUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  };

  return (
    <Layout>
      <Container>
        <MovieHeader>
          <PosterSection>
            <MoviePoster src={movie.posterUrl} alt={movie.title} size="large" />
            <MovieActions 
              movieId={movie.id} 
              isAuthenticated={!!user}
            />
          </PosterSection>
          
          <InfoSection>
            <MovieInfo movie={movie} />
          </InfoSection>
        </MovieHeader>

        <ContentSection>
          <MovieTrailer 
            trailerUrl={movie.trailerUrl}
            movieTitle={movie.title}
            thumbnail={movie.posterUrl}
          />
        </ContentSection>

        <ContentSection>
          <CastList cast={movie.cast} />
        </ContentSection>

        {user && !showReviewForm && (
          <ContentSection>
            <button
              onClick={() => setShowReviewForm(true)}
              style={{
                padding: '1rem 2rem',
                backgroundColor: '#FFD700',
                border: 'none',
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                marginBottom: '2rem'
              }}
            >
              Write a Review
            </button>
          </ContentSection>
        )}

        {showReviewForm && (
          <ContentSection>
            <ReviewForm
              movieId={movie.id}
              onSubmit={handleReviewSubmit}
              isAuthenticated={!!user}
            />
          </ContentSection>
        )}

        <ContentSection>
          <ReviewList
            reviews={reviews || []}
            loading={reviewsLoading}
            onSort={(sortBy) => console.log('Sort by:', sortBy)}
            onLoadMore={() => console.log('Load more')}
            hasMore={false}
          />
        </ContentSection>
      </Container>
    </Layout>
  );
};

export default MovieDetailPage;