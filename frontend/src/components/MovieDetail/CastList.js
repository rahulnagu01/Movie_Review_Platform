// src/components/MovieDetail/CastList.js
import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const CastSection = styled.section`
  margin: 3rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #333;
`;

const CastCard = styled.div`
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const CastImage = styled.div`
  width: 120px;
  height: 120px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const CastPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlaceholderPhoto = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #999;
`;

const CastName = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.25rem;
  color: #333;
`;

const CharacterName = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

const StyledSwiper = styled(Swiper)`
  padding: 1rem 0;
  
  .swiper-button-next,
  .swiper-button-prev {
    color: #FFD700;
    
    &:after {
      font-size: 1.5rem;
      }
`;

const NoCastMessage = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: #f5f5f5;
  border-radius: 12px;
  color: #666;
`;

const CastList = ({ cast }) => {
  // Mock data if no cast provided
  const mockCast = [
    { id: 1, name: 'Olivia Hayes', character: 'Amelia', photo: null },
    { id: 2, name: 'Daniel Carter', character: 'Ethan', photo: null },
    { id: 3, name: 'Sophia Bennett', character: 'Claire', photo: null },
    { id: 4, name: 'Marcus Reed', character: 'Mr. Thompson', photo: null },
    { id: 5, name: 'Isabella Stone', character: 'Ms. Chen', photo: null },
  ];

  const displayCast = cast && cast.length > 0 ? cast : mockCast;

  if (!displayCast || displayCast.length === 0) {
    return (
      <CastSection>
        <SectionTitle>Cast</SectionTitle>
        <NoCastMessage>Cast information not available</NoCastMessage>
      </CastSection>
    );
  }

  return (
    <CastSection>
      <SectionTitle>Cast</SectionTitle>
      <StyledSwiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={2}
        navigation
        breakpoints={{
          480: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
          },
          1280: {
            slidesPerView: 6,
          },
        }}
      >
        {displayCast.map((member) => (
          <SwiperSlide key={member.id}>
            <CastCard>
              <CastImage>
                {member.photo ? (
                  <CastPhoto src={member.photo} alt={member.name} />
                ) : (
                  <PlaceholderPhoto>👤</PlaceholderPhoto>
                )}
              </CastImage>
              <CastName>{member.name}</CastName>
              <CharacterName>{member.character}</CharacterName>
            </CastCard>
          </SwiperSlide>
        ))}
      </StyledSwiper>
    </CastSection>
  );
};

export default CastList;