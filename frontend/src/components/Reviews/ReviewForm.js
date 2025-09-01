// src/components/Reviews/ReviewForm.js
import React, { useState } from 'react';
import styled from 'styled-components';
import StarRating from '../Common/StarRating';
import { toast } from 'react-toastify';

const FormContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
`;

const FormTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: #333;
  text-align: center;
`;

const FormSubtitle = styled.p`
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
`;

const RatingSection = styled.div`
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  text-align: center;
`;

const RatingLabel = styled.p`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #333;
  font-weight: 500;
`;

const StarContainer = styled.div`
  display: flex;
  justify-content: center;
  font-size: 2rem;
`;

const TextAreaSection = styled.div`
  margin-bottom: 2rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #FFD700;
    box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1);
  }
  
  &::placeholder {
    color: #999;
  }
`;

const CharCount = styled.div`
  text-align: right;
  margin-top: 0.5rem;
  color: #666;
  font-size: 0.9rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1.2rem;
  background-color: #FFD700;
  color: #333;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: #FFC700;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const ReviewForm = ({ movieId, onSubmit, isAuthenticated }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const maxLength = 1000;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please login to submit a review');
      return;
    }
    
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    
    if (reviewText.trim().length < 10) {
      toast.error('Review must be at least 10 characters long');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit({
        movieId,
        rating,
        text: reviewText.trim()
      });
      
      // Reset form
      setRating(0);
      setReviewText('');
      toast.success('Review submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <FormTitle>Write a Review</FormTitle>
      <FormSubtitle>Share your thoughts on the movie</FormSubtitle>
      
      <form onSubmit={handleSubmit}>
        <RatingSection>
          <RatingLabel>Your Rating</RatingLabel>
          <StarContainer>
            <StarRating
              rating={rating}
              size="2.5rem"
              clickable
              onRatingChange={setRating}
            />
          </StarContainer>
        </RatingSection>
        
        <TextAreaSection>
          <Label>Your Review</Label>
          <TextArea
            placeholder="What did you like or dislike?"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            maxLength={maxLength}
          />
          <CharCount>
            {reviewText.length}/{maxLength}
          </CharCount>
        </TextAreaSection>
        
        <SubmitButton 
          type="submit" 
          disabled={isSubmitting || !isAuthenticated}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </SubmitButton>
      </form>
    </FormContainer>
  );
};

export default ReviewForm;