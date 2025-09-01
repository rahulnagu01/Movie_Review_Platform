// src/components/Movies/MovieCard.js
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import StarRating from '../Common/StarRating';

const Card = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  }
`;

const PosterContainer = styled.div`
  position: relative;
  padding-bottom: 150%; /* 2:3 aspect ratio */
  overflow: hidden;
`;

const Poster = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlaceholderPoster = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
`;

const CardContent = styled.div`
  padding: 1rem;
`;

const Title = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const Year = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #666;
`;

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };
  
  return (
    <Card onClick={handleClick}>
      <PosterContainer>
        {movie.posterUrl ? (
          <Poster src={movie.posterUrl} alt={movie.title} />
        ) : (
          <PlaceholderPoster>
            🎬
          </PlaceholderPoster>
        )}
      </PosterContainer>
      <CardContent>
        <Title>{movie.title}</Title>
        <Meta>
          <Year>{movie.releaseYear}</Year>
          <Rating>
            <StarRating rating={movie.averageRating} size="0.9rem" />
            <span>({movie.averageRating?.toFixed(1)})</span>
          </Rating>
        </Meta>
      </CardContent>
    </Card>
  );
};

export default MovieCard;