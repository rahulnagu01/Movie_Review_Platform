import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import ReviewHistory from '../components/Profile/ReviewHistory';
import WatchlistSection from '../components/Profile/WatchlistSection';
import { fetchUserReviews } from '../redux/slices/reviewSlice';
import { fetchWatchlist } from '../redux/slices/watchlistSlice';
import { FiEdit2, FiCalendar, FiMail } from 'react-icons/fi';
import { format } from 'date-fns';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const ProfileCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
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
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
`;

const EditButton = styled.button`
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
  border: 3px solid white;
  transition: all 0.3s;
  
  &:hover {
    background-color: #555;
    transform: scale(1.1);
  }
`;

const UserInfo = styled.div`
  flex: 1;
`;

const Username = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  margin-bottom: 0.5rem;
  
  svg {
    color: #999;
  }
`;

const StatsRow = styled.div`
  display: flex;
  gap: 3rem;
  margin-top: 1.5rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
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

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { userReviews } = useSelector((state) => state.reviews);
  const { watchlist } = useSelector((state) => state.watchlist);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        setLoading(true);
        await Promise.all([
          dispatch(fetchUserReviews(user.id)),
          dispatch(fetchWatchlist(user.id))
        ]);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, dispatch, navigate]);

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner fullScreen />
      </Layout>
    );
  }

  const joinDate = user?.createdAt || user?.joinDate || new Date().toISOString();
  const reviewCount = Array.isArray(userReviews) ? userReviews.length : 0;
  const watchlistCount = Array.isArray(watchlist) ? watchlist.length : 0;

  return (
    <Layout>
      <Container>
        <ProfileCard>
          <ProfileHeader>
            <AvatarSection>
              <Avatar>
                {user?.username?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
              </Avatar>
              <EditButton>
                <FiEdit2 size={16} />
              </EditButton>
            </AvatarSection>
            
            <UserInfo>
              <Username>{user?.username || 'User'}</Username>
              <InfoItem>
                <FiMail />
                {user?.email || 'user@example.com'}
              </InfoItem>
              <InfoItem>
                <FiCalendar />
                Joined {format(new Date(joinDate), 'MMMM yyyy')}
              </InfoItem>
              
              <StatsRow>
                <StatItem>
                  <StatNumber>{reviewCount}</StatNumber>
                  <StatLabel>Reviews</StatLabel>
                </StatItem>
                <StatItem>
                  <StatNumber>{watchlistCount}</StatNumber>
                  <StatLabel>Watchlist</StatLabel>
                </StatItem>
              </StatsRow>
            </UserInfo>
          </ProfileHeader>
        </ProfileCard>

        <ReviewHistory reviews={userReviews} />
        <WatchlistSection watchlist={watchlist} />
      </Container>
    </Layout>
  );
};

export default ProfilePage;

// // src/pages/ProfilePage.js
// import React, { useEffect } from 'react';
// import styled from 'styled-components';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import Layout from '../components/Layout/Layout';
// import ProfileHeader from '../components/Profile/ProfileHeader';
// import ProfileStats from '../components/Profile/ProfileStats';
// import ReviewHistory from '../components/Profile/ReviewHistory';
// import WatchlistSection from '../components/Profile/WatchlistSection';
// import LoadingSpinner from '../components/Common/LoadingSpinner';

// const Container = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 2rem;
// `;

// const ProfilePage = () => {
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.auth);
//   const { userReviews, isLoading: reviewsLoading } = useSelector((state) => state.reviews || {});
//   const { watchlist, isLoading: watchlistLoading } = useSelector((state) => state.watchlist || {});

//   useEffect(() => {
//     if (!user) {
//       navigate('/login');
//     }
//   }, [user, navigate]);

//   if (!user) {
//     return null;
//   }

//     const stats = {
//     reviewCount: userReviews?.length || 4,
//     watchlistCount: watchlist?.length || 3,
//     watchedCount: 15,
//     totalMoviesWatched: 42,
//     averageRating: 4.2,
//     totalWatchTime: 84,
//     thisMonthCount: 5
//   };

//   if (reviewsLoading || watchlistLoading) {
//     return (
//       <Layout>
//         <LoadingSpinner fullScreen />
//       </Layout>
//     );
//   }

//   return (
//     <Layout>
//       <Container>
//         <ProfileHeader user={user} stats={stats} />
//         <ProfileStats stats={stats} />
//         <ReviewHistory reviews={userReviews} />
//         <WatchlistSection watchlist={watchlist} />
//       </Container>
//     </Layout>
//   );
// };

// export default ProfilePage;