// src/components/Reviews/ReviewCard.js
import React, { useState } from 'react';
import styled from 'styled-components';
import StarRating from '../Common/StarRating';
import { format } from 'date-fns';
import { FiThumbsUp, FiMoreVertical } from 'react-icons/fi';

const Card = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const UserInfo = styled.div`
  display: flex;
  gap: 1rem;
`;

const UserAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #FFD700;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #333;
  font-size: 1.2rem;
`;

const UserDetails = styled.div`
  flex: 1;
`;

const Username = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.25rem;
  color: #333;
`;

const ReviewMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #666;
  font-size: 0.9rem;
`;

const ReviewDate = styled.span`
  color: #999;
`;

const OptionsButton = styled.button`
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s;
  
  &:hover {
    background-color: #f5f5f5;
    color: #666;
  }
`;

const ReviewContent = styled.div`
  margin: 1rem 0;
  line-height: 1.6;
  color: #555;
`;

const ReviewActions = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 0.9rem;
  transition: color 0.3s;
  
  &:hover {
    color: #333;
  }
  
  &.liked {
    color: #FFD700;
  }
`;

const HelpfulCount = styled.span`
  color: #999;
  font-size: 0.85rem;
`;

const ReviewCard = ({ review }) => {
  const [liked, setLiked] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(review.helpfulCount || 0);

  const handleLike = () => {
    setLiked(!liked);
    setHelpfulCount(liked ? helpfulCount - 1 : helpfulCount + 1);
  };

  return (
    <Card>
      <ReviewHeader>
        <UserInfo>
          <UserAvatar>
            {review.user?.username?.charAt(0).toUpperCase() || 'U'}
          </UserAvatar>
          <UserDetails>
            <Username>{review.user?.username || 'Anonymous'}</Username>
            <ReviewMeta>
              <StarRating rating={review.rating} size="0.9rem" />
              <ReviewDate>
                {review.createdAt ? format(new Date(review.createdAt), 'MMM d, yyyy') : 'Recently'}
              </ReviewDate>
            </ReviewMeta>
          </UserDetails>
        </UserInfo>
        <OptionsButton>
          <FiMoreVertical />
        </OptionsButton>
      </ReviewHeader>
      
      <ReviewContent>{review.text}</ReviewContent>
      
      <ReviewActions>
        <ActionButton 
          className={liked ? 'liked' : ''}
          onClick={handleLike}
        >
          <FiThumbsUp />
          Helpful
          {helpfulCount > 0 && <HelpfulCount>({helpfulCount})</HelpfulCount>}
        </ActionButton>
      </ReviewActions>
    </Card>
  );
};

export default ReviewCard;