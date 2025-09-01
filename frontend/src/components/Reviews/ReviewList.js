// src/components/Reviews/ReviewList.js
import React from 'react';
import styled from 'styled-components';
import ReviewCard from './ReviewCard';
import LoadingSpinner from '../Common/LoadingSpinner';

const ReviewsSection = styled.section`
  margin: 3rem 0;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #333;
`;

const SortDropdown = styled.select`
  padding: 0.5rem 1rem;
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

const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const NoReviewsMessage = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: #f5f5f5;
  border-radius: 12px;
  color: #666;
  
  p {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
`;

const LoadMoreButton = styled.button`
  margin: 2rem auto 0;
  padding: 0.75rem 2rem;
  background-color: #f5f5f5;
  border: none;
  border-radius: 25px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  display: block;
  
  &:hover {
    background-color: #e0e0e0;
    transform: translateY(-2px);
  }
`;

const ReviewList = ({ reviews, loading, onSort, onLoadMore, hasMore }) => {
  if (loading && !reviews.length) {
    return <LoadingSpinner />;
  }

  return (
    <ReviewsSection>
      <SectionHeader>
        <SectionTitle>Reviews ({reviews?.length || 0})</SectionTitle>
        <SortDropdown onChange={(e) => onSort(e.target.value)}>
          <option value="recent">Most Recent</option>
          <option value="helpful">Most Helpful</option>
          <option value="rating-high">Highest Rated</option>
          <option value="rating-low">Lowest Rated</option>
        </SortDropdown>
      </SectionHeader>
      
      {reviews && reviews.length > 0 ? (
        <>
          <ReviewsContainer>
            {reviews.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </ReviewsContainer>
          
          {hasMore && (
            <LoadMoreButton onClick={onLoadMore}>
              {loading ? 'Loading...' : 'Load More Reviews'}
            </LoadMoreButton>
          )}
        </>
      ) : (
        <NoReviewsMessage>
          <p>No reviews yet. Be the first to review this movie!</p>
        </NoReviewsMessage>
      )}
    </ReviewsSection>
  );
};

export default ReviewList;