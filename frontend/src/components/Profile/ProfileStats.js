// src/components/Profile/ProfileStats.js
import React from 'react';
import styled from 'styled-components';
import { FiFilm, FiStar, FiClock, FiTrendingUp } from 'react-icons/fi';

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background-color: ${props => props.color || '#FFD700'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
`;

const StatContent = styled.div`
  flex: 1;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const ProfileStats = ({ stats }) => {
  const statItems = [
    {
      icon: <FiFilm />,
      value: stats?.totalMoviesWatched || 0,
      label: 'Movies Watched',
      color: '#667eea'
    },
    {
      icon: <FiStar />,
      value: stats?.averageRating?.toFixed(1) || '0.0',
      label: 'Average Rating',
      color: '#FFD700'
    },
    {
      icon: <FiClock />,
      value: stats?.totalWatchTime || 0,
      label: 'Hours Watched',
      color: '#f56565'
    },
    {
      icon: <FiTrendingUp />,
      value: stats?.thisMonthCount || 0,
      label: 'This Month',
      color: '#48bb78'
    }
  ];

  return (
    <StatsContainer>
      {statItems.map((stat, index) => (
        <StatCard key={index}>
          <IconWrapper color={stat.color}>
            {stat.icon}
          </IconWrapper>
          <StatContent>
            <StatValue>{stat.value}</StatValue>
            <StatLabel>{stat.label}</StatLabel>
          </StatContent>
        </StatCard>
      ))}
    </StatsContainer>
  );
};

export default ProfileStats;