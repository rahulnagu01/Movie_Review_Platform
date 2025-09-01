// src/components/Movies/MoviePoster.js
import React from 'react';
import styled from 'styled-components';

const PosterWrapper = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const PosterImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const PlaceholderContainer = styled.div`
  width: 100%;
  padding-bottom: 150%; /* 2:3 aspect ratio */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const PlaceholderIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 4rem;
  color: white;
`;

const MoviePoster = ({ src, alt, size = 'medium' }) => {
  const sizes = {
    small: '150px',
    medium: '300px',
    large: '500px',
  };

  return (
    <PosterWrapper style={{ maxWidth: sizes[size] }}>
      {src ? (
        <PosterImage src={src} alt={alt} />
      ) : (
        <PlaceholderContainer>
          <PlaceholderIcon>🎬</PlaceholderIcon>
        </PlaceholderContainer>
      )}
    </PosterWrapper>
  );
};

export default MoviePoster;