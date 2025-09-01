import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const useAuth = (requireAuth = false) => {
  const navigate = useNavigate();
  const { user, token, isLoading } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (requireAuth && !isLoading && !user) {
      navigate('/login');
    }
  }, [requireAuth, user, isLoading, navigate]);
  
  return {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isLoading
  };
};