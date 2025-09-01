// src/components/Common/LoadingSpinner.js
import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: ${props => props.fullScreen ? '100vh' : '200px'};
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #FFD700;
  border-radius: 50%;
  width: ${props => props.size || '40px'};
  height: ${props => props.size || '40px'};
  animation: ${spin} 1s linear infinite;
`;

const LoadingSpinner = ({ size, fullScreen }) => {
  return (
    <SpinnerContainer fullScreen={fullScreen}>
      <Spinner size={size} />
    </SpinnerContainer>
  );
};

export default LoadingSpinner;