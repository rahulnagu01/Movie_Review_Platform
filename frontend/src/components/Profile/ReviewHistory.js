import React from 'react';
import styled from 'styled-components';
import MovieCard from '../Movies/MovieCard';
import { useNavigate } from 'react-router-dom';

const HistorySection = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #333;
`;

const ReviewGrid = styled.div`
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

const ReviewHistory = ({ reviews }) => {
  const navigate = useNavigate();
  
  // Ensure reviews is an array
  const reviewsList = Array.isArray(reviews) ? reviews : [];
  
  // Extract movies from reviews if they have movie property
  const movies = reviewsList.map(review => {
    if (review.movie) {
      return {
        ...review.movie,
        userRating: review.rating,
        reviewDate: review.createdAt
      };
    }
    return review;
  }).filter(movie => movie.id && movie.title);

  if (movies.length === 0) {
    return (
      <HistorySection>
        <SectionTitle>Review History</SectionTitle>
        <EmptyMessage>
          <p>You haven't reviewed any movies yet.</p>
          <BrowseButton onClick={() => navigate('/movies')}>
            Browse Movies
          </BrowseButton>
        </EmptyMessage>
      </HistorySection>
    );
  }

  return (
    <HistorySection>
      <SectionTitle>Review History ({movies.length})</SectionTitle>
      <ReviewGrid>
        {movies.map((movie, index) => (
          <MovieCard key={movie.id || index} movie={movie} />
        ))}
      </ReviewGrid>
    </HistorySection>
  );
};

export default ReviewHistory;

// // src/components/Profile/ReviewHistory.js
// import React from 'react';
// import styled from 'styled-components';
// import MovieCard from '../Movies/MovieCard';

// const HistorySection = styled.section`
//   margin-bottom: 3rem;
// `;

// const SectionTitle = styled.h2`
//   font-size: 1.8rem;
//   margin-bottom: 1.5rem;
//   color: #333;
// `;

// const ReviewGrid = styled.div`
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

// const ReviewHistory = ({ reviews }) => {
//   // Mock data for testing
//   const mockReviews = [
//     { id: 1, movie: { id: 1, title: 'The Silent Echo', releaseYear: 2023, posterUrl: null, averageRating: 4.5 } },
//     { id: 2, movie: { id: 2, title: 'Starfall', releaseYear: 2023, posterUrl: null, averageRating: 4.2 } },
//     { id: 3, movie: { id: 3, title: 'Crimson Tide', releaseYear: 2023, posterUrl: null, averageRating: 4.7 } },
//     { id: 4, movie: { id: 4, title: 'Whispers of the Past', releaseYear: 2023, posterUrl: null, averageRating: 4.0 } },
//   ];

//   const displayReviews = reviews || mockReviews;

//   if (!displayReviews || displayReviews.length === 0) {
//     return (
//       <HistorySection>
//         <SectionTitle>Review History</SectionTitle>
//         <EmptyMessage>
//           You haven't reviewed any movies yet.
//         </EmptyMessage>
//       </HistorySection>
//     );
//   }

//   return (
//     <HistorySection>
//       <SectionTitle>Review History</SectionTitle>
//       <ReviewGrid>
//         {displayReviews.map(review => (
//           <MovieCard key={review.id} movie={review.movie} />
//         ))}
//       </ReviewGrid>
//     </HistorySection>
//   );
// };

// export default ReviewHistory;