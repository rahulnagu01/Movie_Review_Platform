// src/components/MovieDetail/MovieInfo.js
import React from 'react';
import styled from 'styled-components';
import StarRating from '../Common/StarRating';

const InfoContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`;

const TitleSection = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const Meta = styled.div`
  display: flex;
  gap: 2rem;
  color: #666;
  font-size: 1rem;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RatingSection = styled.div`
  text-align: right;
`;

const RatingNumber = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
`;

const RatingCount = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const Synopsis = styled.div`
  margin: 2rem 0;
  
  h3 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
    color: #333;
  }
  
  p {
    line-height: 1.8;
    color: #555;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
`;

const InfoItem = styled.div`
  h4 {
    color: #666;
    font-size: 0.9rem;
    font-weight: normal;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #333;
    font-weight: 500;
  }
`;

const GenreTags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const GenreTag = styled.span`
  padding: 0.4rem 1rem;
  background-color: #f0f0f0;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #666;
`;

const MovieInfo = ({ movie }) => {
  if (!movie) return null;

  return (
    <InfoContainer>
      <Header>
        <TitleSection>
          <Title>{movie.title}</Title>
          <Meta>
            <MetaItem>📅 {movie.releaseYear}</MetaItem>
            <MetaItem>⏱️ {movie.runtime || '120'} min</MetaItem>
            <MetaItem>🎭 {movie.rating || 'PG-13'}</MetaItem>
          </Meta>
        </TitleSection>
        <RatingSection>
          <RatingNumber>{movie.averageRating?.toFixed(1) || '0.0'}</RatingNumber>
          <StarRating rating={movie.averageRating || 0} />
          <RatingCount>({movie.reviewCount || 0} reviews)</RatingCount>
        </RatingSection>
      </Header>

      <Synopsis>
        <h3>Synopsis</h3>
        <p>{movie.synopsis || 'No synopsis available.'}</p>
      </Synopsis>

      <InfoGrid>
        <InfoItem>
          <h4>Director</h4>
          <p>{movie.director || 'Unknown'}</p>
        </InfoItem>
        <InfoItem>
          <h4>Genre</h4>
          <GenreTags>
            {movie.genre?.split(',').map((genre, index) => (
              <GenreTag key={index}>{genre.trim()}</GenreTag>
            ))}
          </GenreTags>
        </InfoItem>
        <InfoItem>
          <h4>Release Date</h4>
          <p>{movie.releaseDate || `${movie.releaseYear}`}</p>
        </InfoItem>
        <InfoItem>
          <h4>Language</h4>
          <p>{movie.language || 'English'}</p>
        </InfoItem>
      </InfoGrid>
    </InfoContainer>
  );
};

export default MovieInfo;