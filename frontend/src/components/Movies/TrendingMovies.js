// src/components/Movies/TrendingMovies.js
import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import MovieCard from './MovieCard';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const TrendingContainer = styled.section`
  margin-bottom: 3rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #333;
`;

const ViewAllLink = styled.a`
  color: #FFD700;
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: gap 0.3s;
  
  &:hover {
    gap: 1rem;
  }
`;

const StyledSwiper = styled(Swiper)`
  padding: 1rem 0;
  
  .swiper-button-next,
  .swiper-button-prev {
    color: #FFD700;
    
    &:after {
      font-size: 1.5rem;
    }
  }
  
  .swiper-pagination-bullet-active {
    background-color: #FFD700;
  }
`;

const TrendingMovies = ({ movies, title = "Trending Now" }) => {
  return (
    <TrendingContainer>
      <SectionHeader>
        <Title>{title}</Title>
        <ViewAllLink href="/movies">
          View all <span>→</span>
        </ViewAllLink>
      </SectionHeader>
      
      <StyledSwiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          480: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
                    1024: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 5,
          },
        }}
      >
        {movies.map(movie => (
          <SwiperSlide key={movie.id}>
            <MovieCard movie={movie} />
          </SwiperSlide>
        ))}
      </StyledSwiper>
    </TrendingContainer>
  );
};

export default TrendingMovies;
