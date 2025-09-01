// src/pages/NotFoundPage.js
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';

const Container = styled.div`
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
`;

const Content = styled.div`
    max-width: 500px;
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  color: #FFD700;
  margin: 0;
  line-height: 1;
  font-weight: bold;
`;

const ErrorTitle = styled.h2`
  font-size: 2rem;
  color: #333;
  margin: 1rem 0;
`;

const ErrorMessage = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
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
    background-color: #f5f5f5;
    color: #666;
    
    &:hover {
      background-color: #e0e0e0;
      color: #333;
      transform: translateY(-2px);
    }
  }
`;

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Container>
        <Content>
          <ErrorCode>404</ErrorCode>
          <ErrorTitle>Page Not Found</ErrorTitle>
          <ErrorMessage>
            Oops! The page you're looking for seems to have wandered off into the cinematic universe. 
            Let's get you back on track.
          </ErrorMessage>
          <ButtonGroup>
            <Button className="primary" onClick={() => navigate('/')}>
              Go Home
            </Button>
            <Button className="secondary" onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </ButtonGroup>
        </Content>
      </Container>
    </Layout>
  );
};

export default NotFoundPage;