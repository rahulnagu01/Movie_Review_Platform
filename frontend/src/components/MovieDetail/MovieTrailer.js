// src/components/MovieDetail/MovieTrailer.js
import React, { useState } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { FiPlay } from 'react-icons/fi';

const TrailerSection = styled.div`
  margin: 2rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #333;
`;

const TrailerContainer = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  border-radius: 12px;
  overflow: hidden;
  background-color: #000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const PlayerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const ThumbnailOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: ${props => props.thumbnail ? `url(${props.thumbnail})` : 'none'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }
`;

const PlayButton = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  background-color: rgba(255, 215, 0, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  
  &:hover {
    transform: scale(1.1);
    background-color: #FFD700;
  }
  
  svg {
    font-size: 2rem;
    color: #333;
    margin-left: 5px;
  }
`;

const NoTrailerMessage = styled.div`
  height: 300px;
  background-color: #f5f5f5;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 1.1rem;
`;

const MovieTrailer = ({ trailerUrl, movieTitle, thumbnail }) => {
  const [playing, setPlaying] = useState(false);

  if (!trailerUrl) {
    return (
      <TrailerSection>
        <SectionTitle>Trailer</SectionTitle>
        <NoTrailerMessage>
          No trailer available for this movie
        </NoTrailerMessage>
      </TrailerSection>
    );
  }

  return (
    <TrailerSection>
      <SectionTitle>Trailer</SectionTitle>
      <TrailerContainer>
        {!playing && thumbnail && (
          <ThumbnailOverlay 
            thumbnail={thumbnail}
            onClick={() => setPlaying(true)}
          >
            <PlayButton>
              <FiPlay />
            </PlayButton>
          </ThumbnailOverlay>
        )}
        <PlayerWrapper>
          <ReactPlayer
            url={trailerUrl}
            width="100%"
            height="100%"
            playing={playing}
            controls
            onPlay={() => setPlaying(true)}
          />
        </PlayerWrapper>
      </TrailerContainer>
    </TrailerSection>
  );
};

export default MovieTrailer;