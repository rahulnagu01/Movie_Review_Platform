// src/components/Auth/LoginForm.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../redux/slices/authSlice';
import { FiMail, FiLock } from 'react-icons/fi';
import { toast } from 'react-toastify';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
`;

const FormCard = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  
  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    color: #333;
    margin: 0;
    
    &::before {
      content: '✨ ';
      color: #FFD700;
    }
  }
  
  p {
    color: #666;
    margin-top: 0.5rem;
  }
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 1px solid #eee;
`;

const Tab = styled.button`
  flex: 1;
  padding: 1rem;
  border: none;
  background: none;
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.active ? '#333' : '#999'};
  border-bottom: ${props => props.active ? '3px solid #FFD700' : 'none'};
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    color: #333;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  position: relative;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #666;
    font-weight: 500;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  
  svg {
    position: absolute;
    left: 1rem;
    color: #999;
    font-size: 1.2rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 1px solid #e0e0e0;
  border-radius: 50px;
  font-size: 1rem;
  transition: all 0.3s;
  
  &:focus {
    outline: none;
    border-color: #FFD700;
    box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1);
  }
  
  &::placeholder {
    color: #999;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1.2rem;
  background-color: #FFD700;
  color: #333;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 1rem;
  
  &:hover {
    background-color: #FFC700;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const BottomText = styled.p`
  text-align: center;
  margin-top: 2rem;
  color: #666;
  
  a {
    color: #FFD700;
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await dispatch(login(formData)).unwrap();
      
      // Check if login was successful
      if (result.token && result.user) {
        toast.success('Login successful!');
        // Small delay to ensure state is updated
        setTimeout(() => {
          navigate('/');
        }, 100);
      }
    } catch (error) {
      toast.error(error || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <FormCard>
        <Logo>
          <h1>CineTrack</h1>
          <p>Your ultimate movie companion</p>
        </Logo>
        
        <TabContainer>
          <Tab active={true}>
            Login
          </Tab>
          <Tab 
            active={false} 
            onClick={() => navigate('/register')}
          >
            Register
          </Tab>
        </TabContainer>
        
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <label>Email</label>
            <InputWrapper>
              <FiMail />
              <Input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </InputWrapper>
          </InputGroup>
          
          <InputGroup>
            <label>Password</label>
            <InputWrapper>
              <FiLock />
              <Input
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </InputWrapper>
          </InputGroup>
          
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </Form>
        
        <BottomText>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </BottomText>
      </FormCard>
    </Container>
  );
};

export default LoginForm;