import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiSearch, FiBell, FiUser, FiLogOut } from 'react-icons/fi';
import { logout } from '../../redux/slices/authSlice';

const HeaderContainer = styled.header`
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  span {
    color: #FFD700;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;
  flex: 1;
`;

const NavLink = styled(Link)`
  color: #666;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
  
  &:hover {
    color: #333;
  }
`;

const SearchBar = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid #e0e0e0;
  border-radius: 25px;
  font-size: 0.95rem;
  transition: all 0.3s;
  
  &:focus {
    outline: none;
    border-color: #FFD700;
    box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1);
  }
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 1.2rem;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  position: relative;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: #666;
  font-size: 1.3rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s;
  
  &:hover {
    background-color: #f5f5f5;
    color: #333;
  }
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #FFD700;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 25px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  
  &.primary {
    background-color: #FFD700;
    color: #333;
    
    &:hover {
      background-color: #FFC700;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
    }
  }
  
  &.secondary {
    background-color: transparent;
    color: #666;
    border: 1px solid #ddd;
    
    &:hover {
      border-color: #FFD700;
      color: #333;
    }
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  z-index: 1000;
`;

const DropdownItem = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 1rem;
  border: none;
  background: none;
  color: #333;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  text-align: left;
  
  &:hover {
    background-color: #f5f5f5;
  }
  
  &:first-child {
    border-radius: 12px 12px 0 0;
  }
  
  &:last-child {
    border-radius: 0 0 12px 12px;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  // Check if user is authenticated
  const isAuthenticated = !!user && !!token;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/movies?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setShowDropdown(false);
    navigate('/');
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">
          <span>✨</span> CineTrack
        </Logo>
        
        <Nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/movies">Movies</NavLink>
          {isAuthenticated && (
            <>
              <NavLink to="/watchlist">Watchlist</NavLink>
              <NavLink to="/profile">Profile</NavLink>
            </>
          )}
        </Nav>
        
        <SearchBar>
          <form onSubmit={handleSearch}>
            <SearchIcon />
            <SearchInput
              type="text"
              placeholder="Search movies..."
                            value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </SearchBar>
        
        <UserSection>
          {isAuthenticated ? (
            <>
              <IconButton>
                <FiBell />
              </IconButton>
              <UserAvatar 
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {user.username?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
              </UserAvatar>
              {showDropdown && (
                <DropdownMenu>
                  <DropdownItem onClick={() => {
                    navigate('/profile');
                    setShowDropdown(false);
                  }}>
                    <FiUser /> Profile
                  </DropdownItem>
                  <DropdownItem onClick={handleLogout}>
                    <FiLogOut /> Logout
                  </DropdownItem>
                </DropdownMenu>
              )}
            </>
          ) : (
            <AuthButtons>
              <Button className="secondary" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button className="primary" onClick={() => navigate('/register')}>
                Sign Up
              </Button>
            </AuthButtons>
          )}
        </UserSection>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;


// // src/components/Layout/Header.js
// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { Link, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { FiSearch, FiBell, FiUser } from 'react-icons/fi';

// const HeaderContainer = styled.header`
//   background-color: #fff;
//   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
//   position: sticky;
//   top: 0;
//   z-index: 1000;
// `;

// const HeaderContent = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 1rem 2rem;
//   display: flex;
//   align-items: center;
//   gap: 2rem;
// `;

// const Logo = styled(Link)`
//   font-size: 1.8rem;
//   font-weight: bold;
//   color: #333;
//   text-decoration: none;
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
  
//   span {
//     color: #FFD700;
//   }
// `;

// const Nav = styled.nav`
//   display: flex;
//   gap: 2rem;
//   align-items: center;
//   flex: 1;
// `;

// const NavLink = styled(Link)`
//   color: #666;
//   text-decoration: none;
//   font-weight: 500;
//   transition: color 0.3s;
  
//   &:hover {
//     color: #333;
//   }
// `;

// const SearchBar = styled.div`
//   position: relative;
//   flex: 1;
//   max-width: 400px;
// `;

// const SearchInput = styled.input`
//   width: 100%;
//   padding: 0.75rem 1rem 0.75rem 3rem;
//   border: 1px solid #e0e0e0;
//   border-radius: 25px;
//   font-size: 0.95rem;
//   transition: all 0.3s;
  
//   &:focus {
//     outline: none;
//     border-color: #FFD700;
//     box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1);
//   }
// `;

// const SearchIcon = styled(FiSearch)`
//   position: absolute;
//   left: 1rem;
//   top: 50%;
//   transform: translateY(-50%);
//   color: #999;
//   font-size: 1.2rem;
// `;

// const UserSection = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 1.5rem;
// `;

// const IconButton = styled.button`
//   background: none;
//   border: none;
//   color: #666;
//   font-size: 1.3rem;
//   cursor: pointer;
//   padding: 0.5rem;
//   border-radius: 50%;
//   transition: all 0.3s;
  
//   &:hover {
//     background-color: #f5f5f5;
//     color: #333;
//   }
// `;

// const UserAvatar = styled.div`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   background-color: #FFD700;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: #333;
//   font-weight: bold;
//   cursor: pointer;
//   transition: transform 0.3s;
  
//   &:hover {
//     transform: scale(1.05);
//   }
// `;

// const AuthButtons = styled.div`
//   display: flex;
//   gap: 1rem;
// `;

// const Button = styled.button`
//   padding: 0.75rem 1.5rem;
//   border: none;
//   border-radius: 25px;
//   font-weight: 500;
//   cursor: pointer;
//   transition: all 0.3s;
  
//   &.primary {
//     background-color: #FFD700;
//     color: #333;
    
//     &:hover {
//       background-color: #FFC700;
//       transform: translateY(-2px);
//       box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
//     }
//   }
  
//   &.secondary {
//     background-color: transparent;
//     color: #666;
//     border: 1px solid #ddd;
    
//     &:hover {
//       border-color: #FFD700;
//       color: #333;
//     }
//   }
// `;

// const Header = () => {
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState('');
//   // For now, we'll mock the auth state
//   const isAuthenticated = false;
//   const user = null;

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/movies?search=${encodeURIComponent(searchQuery)}`);
//     }
//   };

//   return (
//     <HeaderContainer>
//       <HeaderContent>
//         <Logo to="/">
//           <span>✨</span> CineTrack
//         </Logo>
        
//         <Nav>
//           <NavLink to="/">Home</NavLink>
//           <NavLink to="/movies">Movies</NavLink>
//           {isAuthenticated && <NavLink to="/watchlist">Watchlist</NavLink>}
//         </Nav>
        
//         <SearchBar>
//           <form onSubmit={handleSearch}>
//             <SearchIcon />
//             <SearchInput
//               type="text"
//               placeholder="Search movies..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </form>
//         </SearchBar>
        
//         <UserSection>
//           {isAuthenticated ? (
//             <>
//               <IconButton>
//                 <FiBell />
//               </IconButton>
//               <UserAvatar onClick={() => navigate('/profile')}>
//                 {user?.username?.charAt(0).toUpperCase() || 'U'}
//               </UserAvatar>
//             </>
//           ) : (
//             <AuthButtons>
//               <Button className="secondary" onClick={() => navigate('/login')}>
//                 Login
//               </Button>
//               <Button className="primary" onClick={() => navigate('/register')}>
//                 Sign Up
//               </Button>
//             </AuthButtons>
//           )}
//         </UserSection>
//       </HeaderContent>
//     </HeaderContainer>
//   );
// };

// export default Header;