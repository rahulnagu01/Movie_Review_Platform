// src/components/Profile/ProfileHeader.js
import React from 'react';
import styled from 'styled-components';
import { FiEdit2 } from 'react-icons/fi';

const HeaderContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const AvatarSection = styled.div`
  position: relative;
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #FFD700;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: bold;
  color: #333;
  position: relative;
  overflow: hidden;
`;

const EditIconOverlay = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #333;
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: #555;
    transform: scale(1.1);
  }
`;

const UserDetails = styled.div`
  flex: 1;
`;

const Username = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const Email = styled.p`
  color: #666;
  margin-bottom: 1rem;
`;

const Stats = styled.div`
  display: flex;
  gap: 3rem;
  margin-top: 1.5rem;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const EditButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #f5f5f5;
  border: none;
  border-radius: 25px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s;
  
  &:hover {
    background-color: #e0e0e0;
    transform: translateY(-2px);
  }
`;

const ProfileHeader = ({ user, stats }) => {
  return (
    <HeaderContainer>
      <ProfileInfo>
        <AvatarSection>
          <Avatar>
            {user?.username?.charAt(0).toUpperCase() || 'U'}
          </Avatar>
          <EditIconOverlay>
            <FiEdit2 size={16} />
          </EditIconOverlay>
        </AvatarSection>
        
        <UserDetails>
          <Username>{user?.username || 'User'}</Username>
          <Email>{user?.email || 'user@example.com'}</Email>
          
          <Stats>
            <StatItem>
              <StatNumber>{stats?.reviewCount || 0}</StatNumber>
              <StatLabel>Reviews</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>{stats?.watchlistCount || 0}</StatNumber>
              <StatLabel>Watchlist</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>{stats?.watchedCount || 0}</StatNumber>
              <StatLabel>Watched</StatLabel>
            </StatItem>
          </Stats>
        </UserDetails>
        
        <EditButton>
          <FiEdit2 />
          Edit Profile
        </EditButton>
      </ProfileInfo>
    </HeaderContainer>
  );
};

export default ProfileHeader;