import React from 'react';
import styled from 'styled-components';
import MovieCard from '../Movies/MovieCard';
import { Link, useNavigate } from 'react-router-dom';

const WatchlistContainer = styled.section`
  margin-bottom: 3rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #333;
`;

const ViewAllLink = styled(Link)`
  color: #FFD700;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
  
  &:hover {
    text-decoration: underline;
  }
`;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: #f5f5f5;
  border-radius: 12px;
  color: #666;
`;

const BrowseButton = styled.button`
  margin-top: 1rem;
  padding: 0.75rem 2rem;
  background-color: #FFD700;
  color: #333;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: #FFC700;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
  }
`;

const WatchlistSection = ({ watchlist, limit = 4 }) => {
  const navigate = useNavigate();
  
  // Ensure watchlist is an array
  const watchlistArray = Array.isArray(watchlist) ? watchlist : [];
  const limitedWatchlist = watchlistArray.slice(0, limit);
  const hasMore = watchlistArray.length > limit;

  if (watchlistArray.length === 0) {
    return (
      <WatchlistContainer>
        <SectionTitle>Watchlist</SectionTitle>
        <EmptyMessage>
          <p>Your watchlist is empty. Add movies to watch later!</p>
          <BrowseButton onClick={() => navigate('/movies')}>
            Browse Movies
          </BrowseButton>
        </EmptyMessage>
      </WatchlistContainer>
    );
  }

  return (
    <WatchlistContainer>
      <SectionHeader>
        <SectionTitle>Watchlist ({watchlistArray.length})</SectionTitle>
        {hasMore && (
          <ViewAllLink to="/watchlist">
            View all
          </ViewAllLink>
        )}
      </SectionHeader>
      <MovieGrid>
        {limitedWatchlist.map((movie, index) => (
          <MovieCard key={movie.id || index} movie={movie} />
        ))}
      </MovieGrid>
    </WatchlistContainer>
  );
};

export default WatchlistSection;

// // src/components/Profile/WatchlistSection.js
// import React from 'react';
// import styled from 'styled-components';
// import MovieCard from '../Movies/MovieCard';
// import { Link } from 'react-router-dom';

// const WatchlistContainer = styled.section`
//   margin-bottom: 3rem;
// `;

// const SectionHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 1.5rem;
// `;

// const SectionTitle = styled.h2`
//   font-size: 1.8rem;
//   color: #333;
// `;

// const ViewAllLink = styled(Link)`
//   color: #FFD700;
//   text-decoration: none;
//   font-weight: 500;
//   transition: all 0.3s;
  
//   &:hover {
//     text-decoration: underline;
//   }
// `;

// const MovieGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
//   gap: 1.5rem;
// `;

// const EmptyMessage = styled.div`
//   text-align: center;
//   padding: 3rem;
//   background-color: #f5f5f5;
//   border-radius: 12px;
//   color: #666;
// `;

// const WatchlistSection = ({ watchlist, limit = 6 }) => {
//   // Mock data for testing
//   const mockWatchlist = [
//     { id: 1, title: 'The Last Frontier', releaseYear: 2023, posterUrl: null, averageRating: 4.8 },
//     { id: 2, title: 'City of Dreams', releaseYear: 2023, posterUrl: null, averageRating: 4.3 },
//     { id: 3, title: 'Eternal Night', releaseYear: 2023, posterUrl: null, averageRating: 4.6 },
//     { id: 4, title: 'The Hidden Path', releaseYear: 2023, posterUrl: null, averageRating: 4.1 },
//   ];

//   const displayWatchlist = watchlist || mockWatchlist;
//   const limitedWatchlist = displayWatchlist.slice(0, limit);

//   if (!displayWatchlist || displayWatchlist.length === 0) {
//     return (
//       <WatchlistContainer>
//         <SectionTitle>Watchlist</SectionTitle>
//         <EmptyMessage>
//           Your watchlist is empty. Add movies to watch later!
//         </EmptyMessage>
//       </WatchlistContainer>
//     );
//   }

//   return (
//     <WatchlistContainer>
//       <SectionHeader>
//         <SectionTitle>Watchlist</SectionTitle>
//         {displayWatchlist.length > limit && (
//           <ViewAllLink to="/watchlist">
//             View all ({displayWatchlist.length})
//           </ViewAllLink>
//         )}
//       </SectionHeader>
//       <MovieGrid>
//         {limitedWatchlist.map(movie => (
//           <MovieCard key={movie.id} movie={movie} />
//         ))}
//       </MovieGrid>
//     </WatchlistContainer>
//   );
// };

// export default WatchlistSection;