// src/components/Movies/FeaturedMovie.js
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const FeaturedContainer = styled.section`
  position: relative;
  height: 70vh;
  min-height: 500px;
  overflow: hidden;
  margin-bottom: 3rem;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: ${props => props.image ? `url(${props.image})` : 'none'};
  background-size: cover;
  background-position: center;
  filter: brightness(0.4);
`;

const FeaturedContent = styled.div`
  position: relative;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
`;

const ContentWrapper = styled.div`
  max-width: 600px;
  color: white;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
`;

const Tagline = styled.p`
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  opacity: 0.9;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
`;

const Synopsis = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.8;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s;
  
  &.primary {
    background-color: #FFD700;
    color: #333;
    
    &:hover {
      background-color: #FFC700;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(255, 215, 0, 0.4);
    }
  }
  
  &.secondary {
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
    border: 2px solid white;
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
    }
  }
`;

const Badge = styled.span`
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #FFD700;
  color: #333;
  font-weight: 600;
  border-radius: 25px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const FeaturedMovie = ({ movie }) => {
  const navigate = useNavigate();
  
  if (!movie) return null;
  
  return (
    <FeaturedContainer>
      <BackgroundImage image={movie.posterUrl} />
      <FeaturedContent>
        <ContentWrapper>
          <Badge>Featured Movie</Badge>
          <Title>{movie.title}</Title>
          <Tagline>{movie.tagline || `${movie.genre} • ${movie.releaseYear}`}</Tagline>
          <Synopsis>
            {movie.synopsis || 'An epic tale of survival and discovery at the edge of the known world. A must-watch for adventure lovers.'}
          </Synopsis>
          <ButtonGroup>
            <Button 
              className="primary"
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              Watch Now
            </Button>
            <Button className="secondary">
              Add to Watchlist
            </Button>
          </ButtonGroup>
        </ContentWrapper>
      </FeaturedContent>
    </FeaturedContainer>
  );
};

export default FeaturedMovie;