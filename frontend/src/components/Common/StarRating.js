// src/components/Common/StarRating.js
import React from 'react';
import styled from 'styled-components';

const StarsContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
`;

const Star = styled.span`
  color: ${props => props.filled ? '#FFD700' : '#ddd'};
  font-size: ${props => props.size || '1.2rem'};
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  transition: color 0.2s;
  
  &:hover {
    color: ${props => props.clickable ? '#FFD700' : props.filled ? '#FFD700' : '#ddd'};
  }
`;

const StarRating = ({ rating, maxRating = 5, size, clickable, onRatingChange }) => {
  const handleClick = (index) => {
    if (clickable && onRatingChange) {
      onRatingChange(index + 1);
    }
  };

  return (
    <StarsContainer>
      {[...Array(maxRating)].map((_, index) => (
        <Star
          key={index}
          filled={index < rating}
          size={size}
          clickable={clickable}
          onClick={() => handleClick(index)}
        >
          ★
        </Star>
      ))}
    </StarsContainer>
  );
};

export default StarRating;