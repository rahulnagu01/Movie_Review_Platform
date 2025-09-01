import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import MovieCard from '../components/Movies/MovieCard';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import ErrorMessage from '../components/Common/ErrorMessage';
import { fetchWatchlist, removeFromWatchlist, clearWatchlist } from '../redux/slices/watchlistSlice';
import { FiTrash2, FiGrid, FiList } from 'react-icons/fi';
import { toast } from 'react-toastify';


const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
`;

const Stats = styled.div`
  color: #666;
  font-size: 1.1rem;
`;

const FilterBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const FilterButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: 1px solid #e0e0e0;
  background-color: ${props => props.active ? '#FFD700' : 'white'};
  color: ${props => props.active ? '#333' : '#666'};
  border-radius: 25px;
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    border-color: #FFD700;
    background-color: ${props => props.active ? '#FFD700' : '#fff7db'};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
`;

const EmptyTitle = styled.h2`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1rem;
`;

const EmptyMessage = styled.p`
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 2rem;
`;

const BrowseButton = styled.button`
  padding: 1rem 2rem;
  background-color: #FFD700;
  color: #333;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: #FFC700;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
  }
`;

const WatchlistPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { watchlist, isLoading, isError, message } = useSelector((state) => state.watchlist);
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Clear previous errors and fetch watchlist
    dispatch(clearWatchlist());
    dispatch(fetchWatchlist(user.id));
    
    // Cleanup on unmount
    return () => {
      dispatch(clearWatchlist());
    };
  }, [user, dispatch, navigate]);

  const handleRemoveFromWatchlist = async (movieId) => {
    if (!user) return;
    
    try {
      await dispatch(removeFromWatchlist({ 
        userId: user.id, 
        movieId 
      })).unwrap();
      toast.success('Removed from watchlist');
    } catch (error) {
      toast.error(error || 'Failed to remove from watchlist');
    }
  };

  // Filter watchlist based on selected filter
  const filteredWatchlist = Array.isArray(watchlist) ? watchlist.filter(movie => {
    if (filter === 'unwatched') return !movie.watched;
    if (filter === 'watched') return movie.watched;
    return true;
  }) : [];

  if (isLoading) {
    return (
      <Layout>
        <LoadingSpinner fullScreen />
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout>
        <Container>
          <Header>
            <Title>My Watchlist</Title>
          </Header>
          <ErrorMessage message={message || 'Failed to load watchlist'} />
          <EmptyState>
            <BrowseButton onClick={() => navigate('/movies')}>
              Browse Movies
            </BrowseButton>
          </EmptyState>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container>
        <Header>
          <Title>My Watchlist</Title>
          <Stats>{filteredWatchlist.length} movies</Stats>
        </Header>

        <FilterBar>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <FilterButton 
              active={filter === 'all'} 
              onClick={() => setFilter('all')}
            >
              All Movies
            </FilterButton>
            <FilterButton 
              active={filter === 'unwatched'} 
              onClick={() => setFilter('unwatched')}
            >
              Unwatched
            </FilterButton>
            <FilterButton 
              active={filter === 'watched'} 
              onClick={() => setFilter('watched')}
            >
              Watched
            </FilterButton>
          </div>
        </FilterBar>

        {filteredWatchlist.length > 0 ? (
          <MovieGrid>
            {filteredWatchlist.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </MovieGrid>
        ) : (
          <EmptyState>
            <EmptyIcon>📽️</EmptyIcon>
            <EmptyTitle>
              {filter !== 'all' 
                ? `No ${filter} movies in your watchlist`
                : 'Your watchlist is empty'
              }
            </EmptyTitle>
            <EmptyMessage>
              Start adding movies you want to watch later
            </EmptyMessage>
            <BrowseButton onClick={() => navigate('/movies')}>
              Browse Movies
            </BrowseButton>
          </EmptyState>
        )}
      </Container>
    </Layout>
  );
};

// Add the MovieGrid styled component
const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
`;

export default WatchlistPage;

// // src/pages/WatchlistPage.js
// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import Layout from '../components/Layout/Layout';
// import MovieGrid from '../components/Movies/MovieGrid';
// import LoadingSpinner from '../components/Common/LoadingSpinner';
// import { fetchWatchlist, removeFromWatchlist } from '../redux/slices/watchlistSlice';
// import { FiTrash2 } from 'react-icons/fi';
// import { toast } from 'react-toastify';

// const Container = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 2rem;
// `;

// const Header = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 2rem;
// `;

// const Title = styled.h1`
//   font-size: 2.5rem;
//   color: #333;
// `;

// const Stats = styled.div`
//   color: #666;
//   font-size: 1.1rem;
// `;

// const FilterBar = styled.div`
//   display: flex;
//   gap: 1rem;
//   margin-bottom: 2rem;
// `;

// const FilterButton = styled.button`
//   padding: 0.75rem 1.5rem;
//   border: 1px solid #e0e0e0;
//   background-color: ${props => props.active ? '#FFD700' : 'white'};
//   color: ${props => props.active ? '#333' : '#666'};
//   border-radius: 25px;
//   font-weight: ${props => props.active ? '600' : '400'};
//   cursor: pointer;
//   transition: all 0.3s;
  
//   &:hover {
//     border-color: #FFD700;
//     background-color: ${props => props.active ? '#FFD700' : '#fff7db'};
//   }
// `;

// const EmptyState = styled.div`
//   text-align: center;
//   padding: 4rem 2rem;
// `;

// const EmptyIcon = styled.div`
//   font-size: 4rem;
//   margin-bottom: 1rem;
//   opacity: 0.5;
// `;

// const EmptyTitle = styled.h2`
//   font-size: 1.8rem;
//   color: #333;
//   margin-bottom: 1rem;
// `;

// const EmptyMessage = styled.p`
//   color: #666;
//   font-size: 1.1rem;
//   margin-bottom: 2rem;
// `;

// const BrowseButton = styled.button`
//   padding: 1rem 2rem;
//   background-color: #FFD700;
//   color: #333;
//   border: none;
//   border-radius: 50px;
//   font-size: 1.1rem;
//   font-weight: 600;
//   cursor: pointer;
//   transition: all 0.3s;
  
//   &:hover {
//     background-color: #FFC700;
//     transform: translateY(-2px);
//     box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
//   }
// `;

// const WatchlistPage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const { watchlist, isLoading } = useSelector((state) => state.watchlist || {});
//   const [filter, setFilter] = useState('all');

//   useEffect(() => {
//     if (!user) {
//       navigate('/login');
//       return;
//     }
    
//     dispatch(fetchWatchlist(user.id));
//   }, [user, dispatch, navigate]);

//   const handleRemoveFromWatchlist = async (movieId) => {
//     try {
//       await dispatch(removeFromWatchlist({ userId: user.id, movieId })).unwrap();
//       toast.success('Removed from watchlist');
//     } catch (error) {
//       toast.error('Failed to remove from watchlist');
//     }
//   };

//   // Mock watchlist data for testing
//   const mockWatchlist = watchlist || [
//     { id: 1, title: 'The Last Frontier', releaseYear: 2023, posterUrl: null, averageRating: 4.8, addedDate: '2024-01-15' },
//     { id: 2, title: 'City of Dreams', releaseYear: 2023, posterUrl: null, averageRating: 4.3, addedDate: '2024-01-14' },
//     { id: 3, title: 'Eternal Night', releaseYear: 2023, posterUrl: null, averageRating: 4.6, addedDate: '2024-01-13' },
//     { id: 4, title: 'The Hidden Path', releaseYear: 2023, posterUrl: null, averageRating: 4.1, addedDate: '2024-01-12' },
//   ];

//   const filteredWatchlist = mockWatchlist.filter(movie => {
//     if (filter === 'unwatched') return !movie.watched;
//     if (filter === 'watched') return movie.watched;
//     return true;
//   });

//   if (isLoading) {
//     return (
//       <Layout>
//         <LoadingSpinner fullScreen />
//       </Layout>
//     );
//   }

//   return (
//     <Layout>
//       <Container>
//         <Header>
//           <Title>My Watchlist</Title>
//           <Stats>{filteredWatchlist.length} movies</Stats>
//         </Header>

//         <FilterBar>
//           <FilterButton 
//             active={filter === 'all'} 
//             onClick={() => setFilter('all')}
//           >
//             All Movies
//           </FilterButton>
//           <FilterButton 
//             active={filter === 'unwatched'} 
//             onClick={() => setFilter('unwatched')}
//           >
//             Unwatched
//           </FilterButton>
//           <FilterButton 
//             active={filter === 'watched'} 
//             onClick={() => setFilter('watched')}
//           >
//             Watched
//           </FilterButton>
//         </FilterBar>

//         {filteredWatchlist.length > 0 ? (
//           <MovieGrid movies={filteredWatchlist} />
//         ) : (
//           <EmptyState>
//             <EmptyIcon>📽️</EmptyIcon>
//             <EmptyTitle>Your watchlist is empty</EmptyTitle>
//             <EmptyMessage>
//               Start adding movies you want to watch later
//             </EmptyMessage>
//             <BrowseButton onClick={() => navigate('/movies')}>
//               Browse Movies
//             </BrowseButton>
//           </EmptyState>
//         )}
//       </Container>
//     </Layout>
//   );
// };

// export default WatchlistPage;