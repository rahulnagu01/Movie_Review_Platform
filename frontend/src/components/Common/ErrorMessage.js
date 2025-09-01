// src/components/Common/ErrorMessage.js
import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  background-color: #fee;
  border: 1px solid #fcc;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  color: #c33;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ErrorIcon = styled.span`
  font-size: 1.5rem;
`;

const ErrorText = styled.p`
  margin: 0;
  flex: 1;
`;

const ErrorMessage = ({ message }) => {
  if (!message) return null;
  
  return (
    <ErrorContainer>
      <ErrorIcon>⚠️</ErrorIcon>
      <ErrorText>{message}</ErrorText>
    </ErrorContainer>
  );
};

export default ErrorMessage;