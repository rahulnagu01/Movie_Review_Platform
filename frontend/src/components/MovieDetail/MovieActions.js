// src/components/MovieDetail/MovieActions.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { FiPlus, FiCheck, FiShare2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ActionsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ActionButton = styled.button`
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &.primary {
    background-color: #FFD700;
    color: #333;
    
    &:hover {
      background-color: #FFC700;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
    }
  }
  
  &.secondary {
    background-color: #f5f5f5;
    color: #666;
    
    &:hover {
      background-color: #e0e0e0;
      color: #333;
      transform: translateY(-2px);
    }
  }
  
  &.added {
    background-color: #4CAF50;
    color: white;
  }
`;

const MovieActions = ({ movieId, isAuthenticated }) => {
  const navigate = useNavigate();
  const [inWatchlist, setInWatchlist] = useState(false);

  const handleAddToWatchlist = () => {
    if (!isAuthenticated) {
      toast.info('Please login to add movies to your watchlist');
      navigate('/login');
      return;
    }
    
    // Toggle watchlist state
    setInWatchlist(!inWatchlist);
    
    if (!inWatchlist) {
      toast.success('Added to watchlist!');
    } else {
      toast.info('Removed from watchlist');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this movie!',
        url: window.location.href,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <ActionsContainer>
      <ActionButton
        className={inWatchlist ? 'added' : 'primary'}
        onClick={handleAddToWatchlist}
      >
        {inWatchlist ? (
          <>
            <FiCheck /> In Watchlist
          </>
        ) : (
          <>
            <FiPlus /> Add to Watchlist
          </>
        )}
      </ActionButton>
      
      <ActionButton className="secondary" onClick={handleShare}>
        <FiShare2 /> Share
      </ActionButton>
    </ActionsContainer>
  );
};

export default MovieActions;