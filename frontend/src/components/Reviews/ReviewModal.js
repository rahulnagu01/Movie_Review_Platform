// src/components/Reviews/ReviewModal.js
import React from 'react';
import styled from 'styled-components';
import { FiX } from 'react-icons/fi';
import ReviewForm from './ReviewForm';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  z-index: 1;
  
  &:hover {
    background-color: #f5f5f5;
    color: #333;
  }
  
  svg {
    font-size: 1.5rem;
  }
`;

const ModalBody = styled.div`
  padding: 2rem;
`;

const ReviewModal = ({ isOpen, onClose, movieId, onSubmit, isAuthenticated }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <CloseButton onClick={onClose}>
          <FiX />
        </CloseButton>
        <ModalBody>
          <ReviewForm
            movieId={movieId}
            onSubmit={onSubmit}
            isAuthenticated={isAuthenticated}
          />
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ReviewModal;